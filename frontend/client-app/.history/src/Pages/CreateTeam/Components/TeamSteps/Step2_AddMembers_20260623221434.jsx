import styles from "./Step2.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import {
  AddMemberIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
} from "../../../../assets/Icons";
import defaultProfile from "../../../../../src/assets/defaultProfile.png";
import { useState } from "react";
import Select, { components } from "react-select";

function Step2_AddMembers({
  formData,
  setFormData,
  onNext,
  onPrev,
  currentUser,
  userOptions,
}) {
  const [showSuccess, setShowSuccessMsg] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
      minHeight: "4.5rem",
      borderRadius: "1rem",
      border: state.isFocused
        ? "0.1rem solid var(--color-primary-dark)"
        : "0.1rem solid var(--color-primary-light)",
      boxShadow: state.isFocused
        ? "0 0 0 0.3rem var(--color-primary-light-2)"
        : "none",
      paddingLeft: "3.5rem", // Make room for the absolute icon
      backgroundColor: "var(--color-white)",
      "&:hover": {
        borderColor: "var(--color-primary-dark)",
      },
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "var(--fs-small)",
      color: "var(--color-gray)",
      fontFamily: "var(--font-family-inter)",
    }),
    input: (base) => ({
      ...base,
      fontSize: "var(--fs-regular)",
      fontFamily: "var(--font-family-inter)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--color-primary-dark)"
        : state.isFocused
          ? "var(--color-primary-light-3)"
          : "transparent",
      color: state.isSelected ? "var(--color-white)" : "var(--color-text)",
      fontSize: "var(--fs-small)",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "var(--fs-small)",
      fontFamily: "var(--font-family-inter)",
    }),
  };

  const handleSelectMember = (selectedOption) => {
    console.log("Selected user:", selectedOption);
    setSelectedUser(selectedOption);
  };

  const handleInvite = () => {
    if (!selectedUser) return;

    setFormData((prev) => {
      const alreadyAdded = prev.members.includes(selectedUser.value);

      if (alreadyAdded) return prev;

      return {
        ...prev,
        members: [...prev.members, selectedUser.value],
      };
    });

    setSelectedUser(null);
    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 5000);
  };
  const handleRemoveInvitation = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((id) => id !== memberId),
    }));
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
              DropdownIndicator: () => null,
            }}
            styles={customStyles}
            placeholder="Search by name or email..."
            onChange={handleSelectMember}
            isSearchable
          />
        </div>

        <CustomButton variant="primary" size="sm" onClick={handleInvite}>
          Invite
        </CustomButton>
      </div>
      {showSuccess && (
        <div className="my-3 text-success fs-4 fw-semibold">
          Invite sent successfully!
        </div>
      )}

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
        {formData.members.map((memberId) => {
          const user = userOptions.find((u) => u.value === memberId);

          return (
            <div key={memberId} className={styles.memberCard}>
              <div className={styles.memberLeft}>
                <img src={defaultProfile} className={styles.avatar} />
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>
                    {user?.label || "Unknown user"}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className={styles.badge}>
                  <CheckIcon /> Invited
                </div>
                <button
                  type="button"
                  className={styles.removeIcon}
                  onClick={() => handleRemoveInvitation(memberId)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-error-red)", 
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem"
                  }}
                >
                  <XIcon color={} />
                </button>
              </div>
            </div>
          );
        })}
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
