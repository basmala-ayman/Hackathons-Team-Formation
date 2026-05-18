import Select from "react-select";
import styles from "./Step1.module.css";

function Step1_TeamBasics({ formData, setFormData, onNext, hackathonList }) {
  //handle any change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 500) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSizeClick = (size) => {
    setFormData({ ...formData, teamSize: size });
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base, //default styles
      padding: "2px",
      borderRadius: "8px",
      borderColor: state.isFocused ? 'var:' : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "none",
      "&:hover": { borderColor: state.isFocused ? "#6366f1" : "#d1d5db" },
    }),
  };
  return <div></div>;
}

export default Step1_TeamBasics;
