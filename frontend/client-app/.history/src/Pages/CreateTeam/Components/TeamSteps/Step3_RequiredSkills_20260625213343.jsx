import styles from "./Step3.module.css";
import CreatableSelect from "react-select/creatable";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { CheckIcon, XIcon, ElectricIcon } from "../../../../assets/Icons";
import { useState } from "react";


function Step3_RequiredSkills({ formData, setFormData, onNext, onPrev, roleOptions, skillsOptions, reverseRolesMap, reverseSkillsMap }) {


const [errors, setErrors] = useState({
    roles: false,
    skills: false,
  });
  const handleAddValue = (field, selectedValue) => {
    if (
      !selectedValue ||
      !selectedValue.value ||
      selectedValue.value.toString().trim() === "" ||
      formData[field].includes(selectedValue.value)
    )
      return;
    setFormData({
      ...formData,
      [field]: [...formData[field], selectedValue.value],
    });
    setErrors((prev) => ({ ...prev, [field]: false }));
  };
  const handleRemoveValue = (field, valueToRemove) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== valueToRemove),
    });
  };

const handleValidationAndNext = () => {
    const isRolesMissing = formData.roles.length === 0;
    const isSkillsMissing = formData.skills.length === 0;

    setErrors({
      roles: isRolesMissing,
      skills: isSkillsMissing,
    });

    if (!isRolesMissing && !isSkillsMissing) {
      onNext();
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "1rem",
      border: "0.1rem solid var(--color-light-gray)",
      padding: "0.5rem",
      fontSize: "var(--fs-small)",
      fontFamily: "var(--font-family-inter)",
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
    noOptionsMessage: (base) => ({
      ...base,
      fontSize: "var(--fs-v-small)",
      color: "var(--color-gray)",
    }),
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-2">
        <label className={styles.label}>Add Roles You're Looking For <span className={styles.asterisk}>*</span></label>
        <CreatableSelect
          isClearable
          isSearchable
          options={roleOptions}
          onChange={(val) => handleAddValue("roles", val)}
          styles={selectStyles}
          placeholder="Search roles..."

        //   value={null}
        />
        {errors.roles && (
          <span style={{ color: "var(--color-error-red)", fontSize: "1.5rem" }}>
            Please select at least one role to proceed.
          </span>
        )}
      </div>

      <div className="d-flex flex-column gap-2">
        <label className={styles.label}>Add Skills You're Looking For <span className={styles.asterisk}>*</span></label>
        <CreatableSelect
          isClearable
          isSearchable
          placeholder="Search skills..."
          options={skillsOptions}
          onChange={(val) => handleAddValue("skills", val)}
          styles={selectStyles}
          //to enhance performs
          ignoreAccents={false}
          ignoreCase={true}
          maxMenuHeight={300}
        // value={null}
        />
        {errors.skills && (
          <span style={{ color: "var(--color-error-red)", fontSize: "1.5rem" }}>
            Please select at least one skill to proceed.
          </span>
        )}
      </div>

      {/* show only if there are selected roles */}
      {formData.roles.length > 0 && (
        <div className={styles.selectedArea}>
          <span className={styles.sectionTitle}>
            Selected Roles ({formData.roles.length})
          </span>
          <div className="d-flex flex-wrap gap-3">
            {formData.roles.map((role, index) => {
              const displayLabel = reverseRolesMap[role];
              return (
                <div key={index} className={styles.skillChip}>
                  {displayLabel}
                  <button
                    type="button"
                    className={styles.removeIcon}
                    onClick={() => handleRemoveValue("roles", role)}
                  >
                    <XIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* show only if there are selected skills */}
      {formData.skills.length > 0 && (
        <div className={styles.selectedArea}>
          <span className={styles.sectionTitle}>
            Selected Skills ({formData.skills.length})
          </span>
          <div className="d-flex flex-wrap gap-3">
            {formData.skills.map((skill, index) => {
              const displayLabel = reverseSkillsMap[skill];
              return (
                <div key={index} className={styles.skillChip}>
                  {displayLabel}
                  <button
                    type="button"
                    className={styles.removeIcon}
                    onClick={() => handleRemoveValue("skills", skill)}
                  >
                    <XIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* recommendations */}
      <div className={styles.popularSection}>
        <div className={styles.popularHeader}>
          <ElectricIcon /> <span>Popular Skills</span>
        </div>
        <div className='d-flex gap-2'>
          {["ML/AI", "UI/UX Design"].map((popSkill) => (
            <button
              key={popSkill}
              className={styles.popularChip}
            //   onClick={() =>
            //     handleAddSkill({ value: popSkill, label: popSkill })
            //   }
            >
              #{popSkill}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actionRow}>
        <CustomButton variant="secondary" size="sm" onClick={onPrev}>
          Previous
        </CustomButton>
        <CustomButton
          variant="primary"
          size="sm"
          onClick={handleValidationAndNext}
        >
          Next Step
        </CustomButton>
      </div>
    </div>
  );
}

export default Step3_RequiredSkills;
