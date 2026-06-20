import React, { useState, useEffect, useCallback } from "react";
import { Modal, Alert } from "react-bootstrap";
import { X } from "lucide-react";
import styles from "./ProfileWizardModal.module.css";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";
import { useAuth } from "../../context/AuthContext/useAuth.js";

import Step1Skills from "./steps/Step1Skills.jsx";
import Step2Interests from "./steps/Step2Interests";
import Step4Final from "./steps/Step4Final.jsx";
import SuccessPopup from "./Success&WarningPopups/SuccessPopup.jsx";

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
    const validInterests = ["AI", "HEALTHCARE", "FINTECH", "EDUCATION", "GAMING", "OTHER"];
    if (validInterests.includes(normalized)) return normalized;
    return null;
  }
  return normalized.replace(/[\s/-]+/g, "_");
};

const generatePayload = (currentValues, originalValues, user) => {
  const payload = new FormData();
  const nameToSubmit = currentValues.name || originalValues.name || user?.name || "User";
  payload.append("name", nameToSubmit);

  if (currentValues.githubUrl) payload.append("githubUrl", currentValues.githubUrl);
  if (currentValues.linkedinUrl) payload.append("linkedinUrl", currentValues.linkedinUrl);


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
  const interestsArray = currentValues.interests || currentValues.intrestes || [];
  const cleanInterests = interestsArray.map(i => cleanAndMapToEnum(typeof i === "string" ? i : i.value, "interest")).filter(Boolean);

  appendIfChanged("skills", currentValues.skills);
  appendIfChanged("bio", currentValues.bio);
  appendIfChanged("techRoles", cleanRoles);
  cleanInterests.forEach(interest => payload.append("intrestes[]", interest));

  if (currentValues.avatarFile instanceof File) {
    payload.append("profilePicture", currentValues.avatarFile);
  }
  if (currentValues.resumeFile instanceof File) payload.append("resume", currentValues.resumeFile);
  return payload;
};

export default function ProfileWizardModal({ show, handleClose, values: externalValues, setValues: setExternalValues, errors, setErrors, onSave, mode = "full" }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingAction, setSubmittingAction] = useState(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [localValues, setLocalValues] = useState(() => ({ ...externalValues }));
  const { user } = useAuth();
  const isSkillsOnly = mode === "skillsOnly";

  useEffect(() => {
    if (show) {
      setCurrentStep(1);
      setShowSuccessScreen(false);
      setLocalValues({ ...externalValues });
    }
  }, [show, externalValues]);

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
    if (!localValues.bio || !localValues.bio.trim()) step1Errors.bio = "Bio is required.";
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return false;
    }
    return true;
  }, [localValues, setErrors]);

  const handleFinish = async (actionType = 'save') => {
    setSubmittingAction(actionType)
    setIsSubmitting(true);
    setErrors({});
    try {
      // Generate only when clicking Save
      const finalPayload = generatePayload(localValues, externalValues, user);
      await onSave(finalPayload, true);
      setExternalValues((prev) => ({ ...prev, ...localValues }));
      setShowSuccessScreen(true);
      setCurrentStep("success");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      setErrors((prev) => ({ ...prev, apiError: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3) await handleFinish('next');
    else setCurrentStep((prev) => prev + 1);
  };

  const handleModalClose = () => {
    setCurrentStep(1);
    setShowSuccessScreen(false);
    setErrors({});
    handleClose();
  };

  return (
    <Modal show={show || showSuccessScreen} onHide={handleModalClose} centered size="lg" className={styles.wizardModal}>
      {typeof currentStep === "number" && !showSuccessScreen && !isSkillsOnly && (
        <div className={styles.wizardHeaderContainer}>
          <div className="d-flex w-100">
            {[1, 2, 3].map((step) => (
              <div key={step} onClick={() => { if (!isSubmitting && !showSuccessScreen) { if (step === 1 || validateStep1()) setCurrentStep(step); } }}
                className={`${styles.stepTab} ${currentStep === step ? styles.activeTab : ""} ${styles.clickableTab}`}>
                Step {step}{step === 1 ? "*" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal.Body className="p-5">
        {errors.apiError && <Alert variant="danger" className="mb-4">{errors.apiError}</Alert>}

        {!showSuccessScreen && currentStep === 1 && <Step1Skills formData={localValues} setFormData={updateLocalValuesWithTracking} errors={errors} setErrors={setErrors} mode={mode} />}
        {!showSuccessScreen && currentStep === 2 && <Step2Interests formData={localValues} setFormData={updateLocalValuesWithTracking} />}
        {!showSuccessScreen && currentStep === 3 && <Step4Final formData={localValues} setFormData={updateLocalValuesWithTracking} handleChange={handleLocalChange} />}
        {showSuccessScreen && <SuccessPopup handleClose={handleModalClose} />}

        {typeof currentStep === "number" && !showSuccessScreen && (
          <div className="d-flex justify-content-between align-items-center mt-5">
            {currentStep > 1 ? (
              <CustomButton variant="secondary" size="sm" onClick={() => setCurrentStep(p => p - 1)}>
                &larr; Back
              </CustomButton>
            ) : <div />}

            <div className="d-flex gap-3">
              {/* زر Save */}
              {!isSkillsOnly && currentStep !== 3 && (
                <CustomButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleFinish('save')}
                  disabled={!!submittingAction}
                >
                  {submittingAction === 'save' ? "Saving..." : "Save"}
                </CustomButton>
              )}

              <CustomButton
                variant="primary"
                size="sm"
                onClick={isSkillsOnly ? () => handleFinish('next') : handleNext}
                disabled={!!submittingAction}
              >
                {submittingAction === 'next'
                  ? "Saving..."
                  : (isSkillsOnly || currentStep === 3) ? "Save" : "Next Step"
                }
              </CustomButton>
            </div>
          </div>
        )}
      </Modal.Body>
      <button onClick={handleModalClose} className={styles.modalCloseBtn}><X size={20} /></button>
    </Modal>
  );
}