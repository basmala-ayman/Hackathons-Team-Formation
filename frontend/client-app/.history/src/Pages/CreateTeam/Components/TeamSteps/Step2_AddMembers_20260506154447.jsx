import { useState } from "react";
import styles from "./Step2.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { AddMemberIcon } from "../../../../assets/Icons";
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
      </div>


      
    </div>
  );
}

export default Step2_AddMembers;
