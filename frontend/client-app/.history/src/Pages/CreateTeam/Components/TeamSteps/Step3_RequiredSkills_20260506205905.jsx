import styles from './Step3.module.css'
import CreatableSelect from 'react-select/creatable';
import CustomButton from '../../../../shared/CustomButton/CustomButton';
import { CheckIcon , XIcon } from '../../../../assets/Icons';
function Step3_RequiredSkills({ formData, setFormData, onNext, onPrev, apiSkills }) {
  
  const validateSkill = (inputValue) => {
    const regex = /^[a-zA-Z0-9.#+\-\s]{1,20}$/;
    return regex.test(inputValue);
  };

  const handleAddSkill = (newValue) => {
    if (!newValue) return;
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
    }),
    option: (base, state) => ({
    ...base,
    fontSize: 'var(--fs-small)', 
    fontFamily: 'var(--font-family-inter)',
    padding: '1rem 1.5rem',
    backgroundColor: state.isFocused ? 'var(--color-primary-light-3)' : 'transparent',
    color: 'var(--color-text)',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontSize: 'var(--fs-v-small)',
    color: 'var(--color-gray)',
  }),
  };
  
    return (
    <div className={styles.container}>
      <label className={styles.label}>Add Skills You're Looking For</label>
      
      <CreatableSelect
        isClearable
        placeholder="Search skills..."
        options={apiSkills} 
        onChange={handleAddSkill}
        styles={selectStyles}
        isValidNewOption={(inputValue) => validateSkill(inputValue)}
        formatCreateLabel={(inputValue) => `Add "${inputValue}" as new skill`}
        value={null} 
      />

      {/* 3. Conditional Selected Skills Area */}
      {formData.skills.length > 0 && (
        <div className={styles.selectedArea}>
          <span className={styles.sectionTitle}>
            Selected Skills ({formData.skills.length})
          </span>
          <div className={styles.chipContainer}>
            {formData.skills.map((skill, index) => (
              <div key={index} className={styles.skillChip}>
                {skill}
                <button 
                  type="button" 
                  className={styles.removeIcon} 
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <XIcon/>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* recommendations */}
      <div className={styles.popularSection}>
        <div className={styles.popularHeader}>
          <HiOutlineLightBulb /> <span>Popular Skills</span>
        </div>
        <div className={styles.chipContainer}>
          {['ML/AI', 'UI/UX Design'].map(popSkill => (
            <button 
              key={popSkill}
              className={styles.popularChip}
              onClick={() => handleAddSkill({ value: popSkill, label: popSkill })}
            >
              #{popSkill}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actionRow}>
        <CustomButton variant="secondary" size='sm' onClick={onPrev}>Previous</CustomButton>
        <CustomButton 
          variant="primary" 
          size='sm'
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
