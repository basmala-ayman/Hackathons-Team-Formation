import CreatableSelect from "react-select/creatable";
import styles from "./Step1.module.css";
import { TeamMeetIcon } from "../../../../assets/Icons";
import { useState } from "react";
import CustomButton from "../../../../shared/CustomButton/CustomButton";

function Step1_TeamBasics({
  formData,
  setFormData,
  onNext,
  hackathonList = [],
  userCreated,
  setUserCreated,
}) {
  //handle if the user has an idea
  const handleToggleIdea = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      hasIdea: isChecked,
      description: isChecked ? formData.description : "",
    });
  };

  //handle any change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 500) return;

    setFormData({ ...formData, [name]: value });
  };

  //handle change in selecting hackathon
  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      hackathonName: selectedOption ? selectedOption.value : "",
    }));
  };
  //Ensuring that hackathon is required
  // inside your component
  const [errors, setErrors] = useState({
    hackathon: false,
    teamSize: false,
     teamName: false,
  });
  const handleValidationAndNext = () => {
    
    const isHackathonMissing =
      !formData.hackathonName || formData.hackathonName.trim() === "";
    const isTeamSizeMissing = !formData.teamSize;

    setErrors({
      hackathon: isHackathonMissing,
      teamSize: isTeamSizeMissing,
    });

    if (!isHackathonMissing && !isTeamSizeMissing) {
      onNext();
    }
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

  if (value === "") {
    setFormData({ ...formData, teamSize: "" });
    return;
  }
  //convert to number
  const numericValue = Number(value);
  if (numericValue > 0 && numericValue <= 10) {
    setFormData({
      ...formData,
      teamSize: numericValue,
    });
  }
};

  //validation of the new entered hackthon
  const validateSkill = (inputValue) => {
    const regex = /^[a-zA-Z0-9.#+\-\s]{1,20}$/;
    return regex.test(inputValue);
  };

  //Select Input Styles
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
    <>
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
        <CreatableSelect
          options={hackathonList}
          styles={selectStyles}
          placeholder="Select or type a hackathon name"
          isSearchable={true}
          isClearable={true}
          isValidNewOption={(inputValue) => validateSkill(inputValue)}
          formatCreateLabel={(inputValue) =>
            `Create new event: "${inputValue}"`
          }
          onChange={(val, actionMeta) => {
            setErrors((prev) => ({ ...prev, hackathon: false }));
            handleSelectChange(val);
            //if user entered new hackthon , action will be "create-option" , so it will be true
            setUserCreated(actionMeta.action === "create-option");
          }}
          value={
            hackathonList.find((opt) => opt.value === formData.hackathonName) ||
            //new created hackathon scenario
            (formData.hackathonName
              ? { label: formData.hackathonName, value: formData.hackathonName }
              : null)
          }
        />
        {errors.hackathon && (
          <span
            style={{
              color: "var(--color-error-red)",
              fontSize: "1.5rem",
              marginTop: "0.2rem",
            }}
          >
            Hackathon selection is required to proceed.
          </span>
        )}
      </div>

      {/* checkbox for idea */}
      <div
        className={`${styles.formGroup} d-flex align-items-center gap-3 mb-4`}
      >
        <input
          type="checkbox"
          id="hasIdea"
          name="hasIdea"
          className={styles.checkbox}
          checked={formData.hasIdea}
          onChange={handleToggleIdea}
        />
        <label htmlFor="hasIdea" className={`${styles.label} mb-0 fw-300`}>
          I already have a project idea for this hackathon{" "}
        </label>
      </div>

      {formData.hasIdea && (
        <div
          className={`${styles.formGroup} animate__animated animate__fadeIn`}
        >
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
      )}

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
              min="6"
              max="10"
              value={formData.teamSize}
              onChange={handleCustomSizeChange}
              autoFocus
            />
          </div>
        )}

        {errors.teamSize && (
          <span
            style={{
              color: "var(--color-error-red)",
              fontSize: "1.5rem",
              marginTop: "0.2rem",
            }}
          >
            Team Size selection is required to proceed.
          </span>
        )}
      </div>

      {/* next button */}
      <CustomButton
        variant="primary"
        size="sm"
        onClick={handleValidationAndNext}
        className={styles.fullWidth}
      >
        Next Step
      </CustomButton>
    </>
  );
}

export default Step1_TeamBasics;
