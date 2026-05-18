import styles from './Step3.module.css'
import CreatableSelect from 'react-select/creatable';
import CustomButton from '../../../../shared/CustomButton/CustomButton';
function Step3_RequiredSkills({ formData, setFormData, onNext, onPrev, apiSkills }) {
  
  const validateSkill = (inputValue) => {
const regex = /^[a-zA-Z0-9.#+\-\s]{1,20}$/;
    return regex.test(inputValue);
  };

  const handleAddSkill = (newValue) => {
    if (!newValue) return;
    
    // Prevents duplicates
    if (formData.skills.includes(newValue.value)) return;

    setFormData({
      ...formData,
      skills: [...formData.skills, newValue.value]
    });
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '1rem',
      border: '0.1rem solid var(--color-light-gray)',
      padding: '0.5rem',
      fontSize: 'var(--fs-small)',
      fontFamily: 'var(--font-family-inter)',
    })
  };
  
    return (
    <div>
      
    </div>
  )
}

export default Step3_RequiredSkills;
