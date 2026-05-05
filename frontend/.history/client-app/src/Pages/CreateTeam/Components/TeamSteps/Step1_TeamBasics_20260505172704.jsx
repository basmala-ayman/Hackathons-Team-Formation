import Select from "react-select";
import styles from "./Step1.module.css";

function Step1_TeamBasics({ formData, setFormData, onNext, hackathonList }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent description from going over 500 chars
    if (name === "description" && value.length > 500) return;

    setFormData({ ...formData, [name]: value });
  };

  
  return <div></div>;
}

export default Step1_TeamBasics;
