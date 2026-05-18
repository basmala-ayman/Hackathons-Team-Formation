import Select from "react-select";
import styles from "./Step1.module.css";
import { TeamMeetIcon } from "../../../../assets/Icons";

function Step1_TeamBasics({ formData, setFormData, onNext, hackathonList }) {
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

  //handle change of team size
  const handleSizeClick = (size) => {
    setFormData({ ...formData, teamSize: size });
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base, //default styles
      padding: "2px",
      borderRadius: "8px",
      borderColor: state.isFocused ? "var( --color-primary-dark)" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "var( --color-primary-dark)" : "#d1d5db",
      },
    }),
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <TeamMeetIcon size={24} />
        <h4 className="fw-bold mb-0">Team Basics</h4>
      </div>
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
          onChange={handleSelectChange}
          // Finds the selected object based on the string saved in formData
          value={
            hackathonList.find(
              (option) => option.value === formData.hackathonName,
            ) || null
          }
        />
      </div>
    </div>
  );
}

export default Step1_TeamBasics;
