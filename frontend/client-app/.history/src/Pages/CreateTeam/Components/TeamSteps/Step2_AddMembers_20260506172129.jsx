import { useState , useRef } from "react";

import styles from "./Step2.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { AddMemberIcon , SearchIcon , CheckIcon} from "../../../../assets/Icons";
import defaultProfile from "../../../../../src/assets/defaultProfile.png";

function Step2_AddMembers({
  formData,
  setFormData,
  onNext,
  onPrev,
  currentUser,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const currentMemberCount = (formData.members?.length || 0) + 1;
  const teamSizeLimit = Number(formData.teamSize) || 1;
  const progressPercentage = Math.min(
    (currentMemberCount / teamSizeLimit) * 100,
    100,
  );

  const inputRef = useRef(null);

  const handleInputContainerClick = () => {
    inputRef.current.focus();
  };

  const handleInvite = () => {
    if (!searchQuery.trim()) return;
    //to be replaced with API
    console.log("Searching backend for:", searchQuery);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <AddMemberIcon size={24} />
        <h4 className="fw-bold mb-0">Build Your Team</h4>
      </div>

      <div className={styles.container}>
      
      {/* --- Progress Bar Section --- */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>Team Progress</span>
          <span>{currentMemberCount}/{teamSizeLimit}</span>
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
      <div className={styles.inputContainer} onClick={handleInputContainerClick}>
        <SearchIcon className={styles.searchIcon} />
        <input 
          ref={inputRef}
          type="text" 
          className={styles.realInput} 
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CustomButton variant="primary" size="sm" onClick={() => console.log("Inviting...")}>
        Invite
      </CustomButton>
    </div>


    {/* Member Info */}
      <div className="my-2">
        <div className={styles.memberCard}>
          <div className={styles.memberLeft}>
            <img 
              src={currentUser?.profilePic || defaultProfile}
              className={styles.avatar} 
              alt="User" 
              width={20}
            />
            <div className={styles.memberInfo}>
              <span className={styles.memberName}>{currentUser?.name || "You"} (Team Lead)</span>
            </div>
          </div>
          <div className={styles.badge}>
            <CheckIcon /> Member
          </div>
        </div>

        {/* Invited Members would be mapped here from formData.members */}
      </div>

      </div>


      
    </div>
  );
}

export default Step2_AddMembers;
