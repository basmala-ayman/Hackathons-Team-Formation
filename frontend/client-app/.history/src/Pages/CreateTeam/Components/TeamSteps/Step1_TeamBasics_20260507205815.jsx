import Select from "react-select";
import styles from "./Step1.module.css";
import { TeamMeetIcon } from "../../../../assets/Icons";
import { useState } from "react";
import CustomButton from "../../../../shared/CustomButton/CustomButton";

function Step1_TeamBasics({
  formData,
  setFormData,
  onNext,
  hackathonList = [],
}) {
  //handle any change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 500) return;

    setFormData({ ...formData, [name]: value });
  };

  //handle change in selecting hackathon
  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      hackathonName: selectedOption ? selectedOption.value : "",
    });
  };
  //Ensuring that hackathon is required
  // inside your component
  const [showError, setShowError] = useState(false);

  const handleValidationAndNext = () => {
    if (!formData.hackathonName || formData.hackathonName.trim() === "") {
      setShowError(true);
      return;
    }

    setShowError(false);
    onNext(); // Proceed to the next step
  };

  //handle change of team size
  const [isOtherActive, setIsOtherActive] = useState(false);
  const handleSizeClick = (size) => {
    setIsOtherActive(false); //if number is already checked -> ignore this
    setFormData({ ...formData, teamSize: size });
  };

  // handle the "Other" button
  const handleOtherClick = () => {
    setIsOtherActive(true);
    setFormData({ ...formData, teamSize: "" });
  };

  const handleCustomSizeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) > 0 && Number(value) < 15)) {
      setFormData({ ...formData, teamSize: value });
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base, //default styles
      padding: "0.2rem",
      borderRadius: "0.8rem",
      fontSize: "var(--fs-small)",
      borderColor: state.isFocused ? "var( --color-primary-dark)" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "var( --color-primary-dark)" : "#d1d5db",
      },
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "var(--fs-small)",
      fontFamily: "var(--font-family-inter)",
      padding: "1rem 1.5rem",
      backgroundColor: state.isFocused
        ? "var(--color-primary-light-3)"
        : "transparent",
      color: "var(--color-text)",
      cursor: "pointer",
    }),
  };
  return (
    <div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Team Name</label>
        <input
          type="text"
          name="teamName"
          className={styles.input}
          placeholder="e.g., Code Crusaders, Tech Titans..."
          value={formData.teamName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Hackathon Name <span className={styles.asterisk}>*</span>
        </label>
        <Select
          options={hackathonList}
          styles={selectStyles}
          placeholder="Select or type a hackathon name"
          isSearchable={true}
          isClearable={true}
          onChange={(val) => {
            setShowError(false);
            handleSelectChange(val);
          }}
          value={
            hackathonList.find((opt) => opt.value === formData.hackathonName) ||
            null
          }
        />
        {showError && (
    <span style={{ color: "var(--color-danger, red)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
      ⚠️ Hackathon selection is required to proceed.
    </span>
  )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Project Description</label>
        <textarea
          name="description"
          className={styles.textarea}
          placeholder="Describe your project idea, goals, and what makes it special..."
          value={formData.description}
          onChange={handleChange}
        />
        <span className={styles.charCount}>
          {formData.description.length}/500 characters
        </span>
      </div>

      {/*team size  */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Team Size <span className={styles.asterisk}>*</span>
        </label>
        <div className={styles.sizeContainer}>
          {/* Standard Buttons */}
          {[2, 3, 4, 5].map((size) => (
            <CustomButton
              key={size}
              variant={
                !isOtherActive && formData.teamSize === size
                  ? "primary"
                  : "secondary"
              }
              type="button"
              onClick={() => handleSizeClick(size)}
              className={styles.compactBtn}
              size="sm"
            >
              {size}
            </CustomButton>
          ))}

          {/* The "Other" Toggle Button */}
          <CustomButton
            variant={isOtherActive ? "primary" : "secondary"}
            onClick={handleOtherClick}
            className={styles.compactBtn}
            size="sm"
          >
            Other
          </CustomButton>
        </div>

        {isOtherActive && (
          <div className={styles.customInputWrapper}>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter team size (e.g. 8)"
              value={formData.teamSize}
              onChange={handleCustomSizeChange}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* next button */}
      <CustomButton
        variant="primary"
        size="sm"
        onClick={onNext}
        disabled={!formData.hackathonName || !formData.teamSize} //validation as team hackthon and team size is required
        className={styles.fullWidth}
      >
        Next Step
      </CustomButton>
    </div>
  );
}

export default Step1_TeamBasics;
