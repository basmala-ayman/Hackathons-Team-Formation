// import { useState, useRef } from "react";

import styles from "./Step2.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { AddMemberIcon, SearchIcon, CheckIcon } from "../../../../assets/Icons";
import defaultProfile from "../../../../../src/assets/defaultProfile.png";
import Select , {components} from 'react-select';

function Step2_AddMembers({
  formData,
  setFormData,
  onNext,
  onPrev,
  currentUser,
  userOptions
}) {
  // const [searchQuery, setSearchQuery] = useState("");
  const currentMemberCount = (formData.members?.length || 0) + 1;
  const teamSizeLimit = Number(formData.teamSize) || 1;
  const progressPercentage = Math.min(
    (currentMemberCount / teamSizeLimit) * 100,
    100,
  );

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <SearchIcon className={styles.selectSearchIcon} />
    {children}
  </components.Control>
);
const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '4.5rem',
      borderRadius: '1rem',
      border: state.isFocused 
        ? '0.1rem solid var(--color-primary-dark)' 
        : '0.1rem solid var(--color-primary-light)',
      boxShadow: state.isFocused ? '0 0 0 0.3rem var(--color-primary-light-2)' : 'none',
      paddingLeft: '3.5rem', // Make room for the absolute icon
      backgroundColor: 'var(--color-white)',
      '&:hover': {
        borderColor: 'var(--color-primary-dark)'
      }
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: 'var(--fs-small)',
      color: 'var(--color-gray)',
      fontFamily: 'var(--font-family-inter)'
    }),
    input: (base) => ({
      ...base,
      fontSize: 'var(--fs-small)',
      fontFamily: 'var(--font-family-inter)'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? 'var(--color-primary-dark)' 
        : state.isFocused ? 'var(--color-primary-light-3)' : 'transparent',
      color: state.isSelected ? 'var(--color-white)' : 'var(--color-text)',
      fontSize: 'var(--fs-small)',
      cursor: 'pointer'
    })
    
  };

const handleSelectMember = (selectedOption) => {
    // Add logic to update formData.members with the new user
    console.log("Selected user:", selectedOption);
  };
  return (      

      <div className={styles.container}>
        {/* --- Progress Bar Section --- */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Team Progress</span>
            <span>
              {currentMemberCount}/{teamSizeLimit}
            </span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(progressPercentage)}% complete
          </span>
        </div>

        {/* --- Search & Invite Section --- */}
      <div className={styles.searchRow}>
      <div className={styles.selectWrapper}>
        <Select
          options={userOptions} // Array of { value: 'userId', label: 'User Name' }
          components={{ 
            Control,
            IndicatorSeparator: () => null, 
            DropdownIndicator: () => null 
          }}
          styles={customStyles}
          placeholder="Search by name or email..."
          onChange={handleSelectMember}
          isSearchable
        />
      </div>
      
      <CustomButton variant="primary" size="sm">
        Invite
      </CustomButton>
    </div>
      

        {/* Member Info */}
        <div className="my-4">
          <div className={styles.memberCard}>
            <div className={styles.memberLeft}>
              <img
                src={currentUser?.profilePic || defaultProfile}
                className={styles.avatar}
                alt="User"
              />
              <div className={styles.memberInfo}>
                <span className={styles.memberName}>
                  {currentUser?.name || "You"}
                </span>
              </div>
            </div>
            <div className={styles.badge}>
              <CheckIcon /> Member
            </div>
          </div>

          {/* Invited Members would be mapped here from formData.members */}
        </div>

        {/* Nav Buttons */}
        <div className={styles.actionRow}>
          <CustomButton variant="secondary" size="sm" onClick={onPrev}>
            Previous
          </CustomButton>
          <CustomButton variant="primary" size="sm" onClick={onNext}>
            Next Step
          </CustomButton>
        </div>
      </div>
  );
}

export default Step2_AddMembers;
