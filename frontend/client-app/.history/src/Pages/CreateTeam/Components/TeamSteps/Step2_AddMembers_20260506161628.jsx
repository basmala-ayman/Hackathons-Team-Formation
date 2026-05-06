import { useState } from "react";
import styles from "./Step2.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { AddMemberIcon , SearchIcon} from "../../../../assets/Icons";
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

  // Focus the hidden input when the user clicks anywhere in the container
  const handleContainerClick = () => {
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
      <div className={styles.searchSection}>
        <label className={styles.searchLabel}>Invite Team Members</label>
        <div className={styles.searchRow}>
          <div className={styles.inputWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CustomButton variant="primary" onClick={handleInvite}>
            Invite
          </CustomButton>
        </div>
      </div>

      </div>


      
    </div>
  );
}

export default Step2_AddMembers;
