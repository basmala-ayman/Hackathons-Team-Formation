import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { X } from "lucide-react";
import styles from "./ProfileWizardModal.module.css";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";

// Import Steps
import Step1Skills from "./steps/Step1Skills.jsx";
import Step2Interests from "./steps/Step2Interests";
import Step3Project from "./steps/Step3Project";
import Step4Final from "./steps/Step4Final.jsx";

// Import Success Popup
import SuccessPopup from "./Success&WarningPopups/SuccessPopup.jsx";

export default function ProfileWizardModal({ show, handleClose, values, setValues, handleChange, errors, setErrors }) {
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep1 = () => {
    const step1Errors = {};
    if (!values.technicalSkills || values.technicalSkills.length === 0) {
      step1Errors.technicalSkills = "Technical skills are required.";
    }
    if (!values.softSkills || values.softSkills.length === 0) {
      step1Errors.softSkills = "Soft skills are required.";
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

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;

    if (currentStep === 3) {
      setCurrentStep("success");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      setCurrentStep("success");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleTabClick = (targetStep) => {
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
                Step{step}{step === 1 ? "*" : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal.Body className="p-5">
        {currentStep === 1 && <Step1Skills formData={values} setFormData={setValues} errors={errors} setErrors={setErrors} />}
        {currentStep === 2 && <Step2Interests formData={values} setFormData={setValues} />}
        {/* {currentStep === 3 && <Step3Project formData={values} setFormData={setValues} handleChange={handleChange} />} */}
        {currentStep === 3 && <Step4Final formData={values} setFormData={setValues} handleChange={handleChange} />}

        {currentStep === "success" && <SuccessPopup handleClose={handleClose} />}

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
              <CustomButton variant="primary" size="sm" onClick={handleNext}>
                {currentStep === 3 ? "Finish" : "Next Step"}
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