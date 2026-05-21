import React, { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { X } from "lucide-react";
import styles from "./ProfileWizardModal.module.css";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";
import { useAuth } from "../../context/AuthContext/useAuth.js";

import Step1Skills from "./steps/Step1Skills.jsx";
import Step2Interests from "./steps/Step2Interests";
import Step4Final from "./steps/Step4Final.jsx";
import SuccessPopup from "./Success&WarningPopups/SuccessPopup.jsx";

export default function ProfileWizardModal({ show, handleClose, values, setValues, handleChange, errors, setErrors, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // FIX 1: Updated Validation to track unified 'skills' instead of splitting them
  const validateStep1 = () => {
    const step1Errors = {};

    if (!values.skills || values.skills.length === 0) {
      step1Errors.skills = "At least one skill is required.";
    }
    if (!values.bio || !values.bio.trim()) {
      step1Errors.bio = "Bio is required.";
    }

    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return false;
    }
    return true;
  };

  const handleModalClose = () => {
    setCurrentStep(1);
    setErrors({});
    handleClose();
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const flattenToStrings = (skillsArray) => {
        if (!skillsArray) return [];
        return skillsArray.map(item => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object") return item.value || item.name || "";
          return "";
        }).filter(Boolean);
      };

      const finalPayload = {
        name: values.name || user?.name || "Hafsa Hikal",
        bio: values.bio || "",
        techRoles: values.techRoles || [],
        profilePicture: values.avatar || values.profilePicture || null,
        githubUrl: values.githubUrl || "",
        linkedinUrl: values.linkedinUrl || "",
        resumeUrl: values.resumeUrl || values.resume || "",
        skills: flattenToStrings(values.skills)
      };

      console.log("Submitting clean transactional Wizard layout payload:", finalPayload);

      await onSave(finalPayload);
      setCurrentStep("success");
    } catch (error) {
      console.error("Profile wizard submission pipeline execution exception:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred while saving your profile.";
      setErrors((prev) => ({ ...prev, apiError: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3) {
      handleFinish();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      handleFinish();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleTabClick = (targetStep) => {
    if (isSubmitting) return;
    if (currentStep === 1 && targetStep > 1) {
      if (!validateStep1()) return;
    }
    setCurrentStep(targetStep);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className={styles.wizardModal}>
      {typeof currentStep === "number" && (
        <div className={styles.wizardHeaderContainer}>
          <div className="d-flex w-100">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                onClick={() => handleTabClick(step)}
                className={`${styles.stepTab} ${currentStep === step ? styles.activeTab : ""} ${styles.clickableTab}`}
              >
                Step {step}{step === 1 ? "*" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal.Body className="p-5">
        {errors.apiError && (
          <Alert variant="danger" className="mb-4">
            {errors.apiError}
          </Alert>
        )}

        {currentStep === 1 && <Step1Skills formData={values} setFormData={setValues} errors={errors} setErrors={setErrors} />}
        {currentStep === 2 && <Step2Interests formData={values} setFormData={setValues} />}
        {currentStep === 3 && <Step4Final formData={values} setFormData={setValues} handleChange={handleChange} />}

        {currentStep === "success" && <SuccessPopup handleClose={handleModalClose} />}

        {typeof currentStep === "number" && (
          <div className="d-flex justify-content-between align-items-center mt-5">
            {currentStep > 1 ? (
              <CustomButton variant="secondary" size="sm" onClick={handleBack}>
                ← Back
              </CustomButton>
            ) : <div />}

            <div className="d-flex gap-3">
              {currentStep > 1 && (
                <CustomButton variant="secondary" size="sm" onClick={handleSkip}>
                  Skip
                </CustomButton>
              )}
              <CustomButton variant="primary" size="sm" onClick={handleNext} disabled={isSubmitting}>
                {currentStep === 3 ? (isSubmitting ? "Saving..." : "Finish") : "Next Step"}
              </CustomButton>
            </div>
          </div>
        )}
      </Modal.Body>

      {typeof currentStep === "number" && (
        <button onClick={handleClose} className={styles.modalCloseBtn} aria-label="Close">
          <X size={20} />
        </button>
      )}
    </Modal>
  );
}