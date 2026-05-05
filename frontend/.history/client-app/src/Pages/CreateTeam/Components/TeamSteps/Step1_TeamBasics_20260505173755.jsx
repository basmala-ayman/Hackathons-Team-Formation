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
  
  const selectStyles={
    control:(base , state)=>(
        {
            ...base , //default 
        }
    )
  }
  return <div></div>;
}

export default Step1_TeamBasics;
