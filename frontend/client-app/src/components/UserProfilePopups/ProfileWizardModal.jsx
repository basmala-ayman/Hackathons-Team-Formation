import React, { useState, useEffect, useCallback } from "react";
import { Modal, Alert } from "react-bootstrap";
import { X } from "lucide-react";
import styles from "./ProfileWizardModal.module.css";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";
import { useAuth } from "../../context/AuthContext/useAuth.js";
import Step1Skills from "./steps/Step1Skills.jsx";
import Step2Interests from "./steps/Step2Interests";
import Step4Final from "./steps/Step4Final.jsx";
import { popUp } from "../../utils/popUp";



const cleanAndMapToEnum = (text, type) => {
  if (!text) return "";
  let normalized = text.toUpperCase().trim();
  if (type === "role") {
    if (normalized.includes("FRONTEND")) return "FRONTEND";
    if (normalized.includes("BACKEND")) return "BACKEND";
    if (normalized.includes("FULL STACK") || normalized.includes("FULLSTACK")) return "FULLSTACK";
    if (normalized.includes("DESIGNER") || normalized.includes("UI")) return "DESIGNER";
    if (normalized.includes("DEVOPS")) return "DEVOPS";
  }
  if (type === "interest") {
    return normalized;
  }
  return normalized.replace(/[\s/-]+/g, "_");
};


const generatePayload = (
  currentValues,
  originalValues,
  user
) => {
  const payload = new FormData();
  const nameToSubmit = currentValues.name || originalValues.name || user?.name || "User";
  payload.append("name", nameToSubmit);

  if (currentValues.githubUrl) payload.append("githubUrl", currentValues.githubUrl);
  if (currentValues.linkedinUrl) payload.append("linkedinUrl", currentValues.linkedinUrl);

  if (currentValues.avatarFile instanceof File) {
    payload.append("profilePicture", currentValues.avatarFile);
  }

  const appendIfChanged = (key, value) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => payload.append(`${key}[]`, item));
      } else {
        payload.append(key, value);
      }
    }
  };

  const rolesArray = currentValues.techRoles || [];
  const cleanRoles = rolesArray.map(r => cleanAndMapToEnum(typeof r === "string" ? r : r.value, "role")).filter(Boolean);
  const interestsArray = currentValues.intrestes || [];
  const VALID_INTERESTS = new Set([
    "AR_VR", "BEGINNER_FRIENDLY", "BLOCKCHAIN", "COMMUNICATION",
    "CYBERSECURITY", "DATABASES", "DESIGN", "DEVOPS", "ECOMMERCE_RETAIL",
    "EDUCATION", "ENTERPRISE", "FINTECH", "GAMING", "HEALTH", "IOT",
    "LIFEHACKS", "LOW_NO_CODE", "MACHINE_LEARNING_AI", "MOBILE",
    "MUSIC_ART", "OPEN_ENDED", "PRODUCTIVITY", "QUANTUM",
    "ROBOTIC_PROCESS_AUTOMATION", "SERVERLESS", "SOCIAL_GOOD",
    "VOICE_SKILLS", "WEB"
  ]);

  const cleanInterests = interestsArray
    .map(i => (typeof i === "string" ? i : i.value).toUpperCase().trim())
    .filter(i => VALID_INTERESTS.has(i));

  appendIfChanged("skills", currentValues.skills);
  appendIfChanged("bio", currentValues.bio);
  appendIfChanged("techRoles", cleanRoles);

  cleanInterests.forEach((interest) => {
    payload.append("intrestes[]", interest);
  });

  // if (cleanInterests.length === 0) {
  //   payload.append("intrestes[]", "__EMPTY__");
  // } else {
  //   cleanInterests.forEach((interest) => {
  //     payload.append("intrestes[]", interest);
  //   });
  // }

  if (currentValues.resumeFile instanceof File) payload.append("resume", currentValues.resumeFile);

  return payload;
};


export default React.memo(function ProfileWizardModal({ show, handleClose, values: externalValues, setValues: setExternalValues, errors, setErrors, onSave, mode = "full" }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeAction, setActiveAction] = useState(null);
  const [localValues, setLocalValues] = useState(() => ({ ...externalValues }));
  const { user, refreshUser } = useAuth();
  const isSkillsOnly = mode === "skillsOnly";

  useEffect(() => {
    if (!show) return;

    const safeAvatar = externalValues?.avatar?.startsWith("blob:")
      ? null
      : externalValues?.avatar;

    setCurrentStep(1);

    setLocalValues({
      ...externalValues,
      avatar: safeAvatar,
      avatarFile: null,
    });

    setErrors({});
  }, [show]);

  const updateLocalValuesWithTracking = useCallback((updater) => {
    setLocalValues((prev) => typeof updater === "function" ? updater(prev) : { ...prev, ...updater });
  }, []);

  const handleLocalChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateStep1 = useCallback(() => {
    const step1Errors = {};
    if (!localValues.skills || localValues.skills.length === 0) step1Errors.skills = "At least one skill is required.";
    if (!localValues.techRoles || localValues.techRoles.length === 0) step1Errors.techRoles = "At least one role is required.";

    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return false;
    }
    setErrors({});
    return true;
  }, [localValues, setErrors]);

  const handleFinish = async (actionType) => {
    if (currentStep === 1 && !validateStep1()) return;

    setActiveAction(actionType);
    setErrors({});

    try {
      const finalPayload = generatePayload(
        localValues,
        externalValues,
        user
      );

      await onSave(finalPayload, true);
      if (localValues.avatarFile instanceof File) {
        await refreshUser();
      }

      setExternalValues(prev => ({
        ...prev,
        skills: localValues.skills,
        techRoles: localValues.techRoles,
        intrestes: localValues.intrestes,
        bio: localValues.bio,
        githubUrl: localValues.githubUrl,
        linkedinUrl: localValues.linkedinUrl,
        name: localValues.name,
        avatarFile: null,
      }));

      handleModalClose();

      setTimeout(() => {
        popUp.success("Profile updated successfully!");
      }, 150);

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";

      setErrors(prev => ({
        ...prev,
        apiError: errorMessage,
      }));
    } finally {
      setActiveAction(null);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3 || isSkillsOnly) await handleFinish('next');
    else setCurrentStep((prev) => prev + 1);
  };

  const handleModalClose = () => {
    setErrors({});
    setActiveAction(null);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      backdrop={true}
      centered
      size="lg"
      className={styles.wizardModal}
    >
      {typeof currentStep === "number" && !isSkillsOnly && (
        <div className={styles.wizardHeaderContainer}>
          <div className="d-flex w-100">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`${styles.stepTab} ${currentStep === step ? styles.activeTab : ""}`}>
                Step {step}{step === 1 ? "*" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal.Body className="p-5">
        {errors.apiError && <Alert variant="danger" className="mb-4">{errors.apiError}</Alert>}
        <>
          {currentStep === 1 && (
            <Step1Skills
              formData={localValues}
              setFormData={updateLocalValuesWithTracking}
              errors={errors}
              setErrors={setErrors}
              mode={mode}
            />
          )}

          {currentStep === 2 && (
            <Step2Interests
              formData={localValues}
              setFormData={updateLocalValuesWithTracking}
            />
          )}

          {currentStep === 3 && (
            <Step4Final
              formData={localValues}
              setFormData={updateLocalValuesWithTracking}
              handleChange={handleLocalChange}
            />
          )}

          <div className="d-flex justify-content-between align-items-center mt-5">
            {currentStep > 1 ? (
              <CustomButton variant="secondary" size="sm" onClick={() => setCurrentStep(p => p - 1)}>
                &larr; Back
              </CustomButton>
            ) : <div />}

            <div className="d-flex gap-3">
              {!isSkillsOnly && currentStep !== 3 && (
                <CustomButton variant="secondary" size="sm" onClick={() => handleFinish('save')} disabled={!!activeAction}>
                  {activeAction === 'save' ? "Saving..." : "Save"}
                </CustomButton>
              )}
              <CustomButton variant="primary" size="sm" onClick={handleNext} disabled={!!activeAction}>
                {activeAction === 'next' ? "Saving..." : (isSkillsOnly || currentStep === 3) ? "Save" : "Next Step"}
              </CustomButton>
            </div>
          </div>
        </>
      </Modal.Body>
      <button onClick={handleModalClose} className={styles.modalCloseBtn}><X size={20} /></button>
    </Modal>
  );
}
)