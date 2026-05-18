import styles from "./Step3.module.css";
import { useMemo } from "react";
import Select from "react-select";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { CheckIcon, XIcon, ElectricIcon } from "../../../../assets/Icons";
import rolesData from "../../../../Data/roles.json";
import skillsData from "../../../../Data/skills.json";
function Step3_RequiredSkills({ formData, setFormData, onNext, onPrev }) {
  const roleOptions = useMemo(() => {
    return Object.entries(rolesData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  const skillsOptions = useMemo(() => {
    return Object.entries(skillsData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

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
  };
  const handleRemoveValue = (field, valueToRemove) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== valueToRemove),
    });
  };

  //to display the key not the value
  const reverseRolesMap = useMemo(() => {
    const map = {};
    Object.entries(rolesData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);
  const reverseSkillsMap = useMemo(() => {
    const map = {};
    Object.entries(rolesData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);

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
        <label className={styles.label}>What roles are you looking for?</label>
        <Select
          isClearable
          isSearchable
          options={roleOptions}
          onChange={(val) => handleAddValue("roles", val)}
          styles={selectStyles}
          placeholder="Search roles..."

          //   value={null}
        />
      </div>

      <div className="d-flex flex-column gap-2">
        <label className={styles.label}>Add Skills You're Looking For</label>
        <Select
          isClearable
          isSearchable
          placeholder="Search skills..."
          options={skillsOptions}
          onChange={(val) => handleAddValue("roles", val)}
          styles={selectStyles}
          // value={null}
        />
      </div>
      {/* show only if there are selected skills */}
      {formData.skills.length > 0 && (
        <div className={styles.selectedArea}>
          <span className={styles.sectionTitle}>
            Selected Roles and Skills ({formData.skills.length})
          </span>
          <div className="d-flex flex-wrap gap-3">
            {formData.skills.map((skill, index) => {
              const displayLabel = reverseRolesMap[skill];
              return (
                <div key={index} className={styles.skillChip}>
                  {displayLabel}
                  <button
                    type="button"
                    className={styles.removeIcon}
                    onClick={() => handleRemoveSkill(skill)}
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
        <div className={styles.chipContainer}>
          {["ML/AI", "UI/UX Design"].map((popSkill) => (
            <button
              key={popSkill}
              className={styles.popularChip}
              onClick={() =>
                handleAddSkill({ value: popSkill, label: popSkill })
              }
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
          onClick={onNext}
          disabled={formData.skills.length === 0}
        >
          Next Step
        </CustomButton>
      </div>
    </div>
  );
}

export default Step3_RequiredSkills;
