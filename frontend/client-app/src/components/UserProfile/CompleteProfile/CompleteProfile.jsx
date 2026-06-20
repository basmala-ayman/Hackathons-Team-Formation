import React, { useState } from "react";
import styles from "./CompleteProfile.module.css";
import { X, ArrowRight } from "lucide-react";
import { ProgressBar } from "react-bootstrap";

export default function CompleteProfile({ onBannerClick, user }) {
  const [isDismissed, setIsDismissed] = useState(false);

  const calculateCompletion = () => {
     // Default score if user data is not available
    if (!user) return 10;

    let score = 10;

    if (user.bio?.trim()) score += 15;

    // Skills
    if (user.technicalSkills?.length > 0 || user.skills?.length > 0) score += 20;

    // Links
    if (user.linkedin || user.linkedinUrl || user.githubUrl) score += 15;

    // Avatar
    if (user.avatar || user.profilePicture) score += 20;

    // Roles
    if (user.techRoles?.length > 0 || user.roles?.length > 0) score += 10;

    // Interests
    if (user.interests?.length > 0 || user.intrestes?.length > 0) score += 10;

    return Math.min(score, 100);
  };
  const completionPercentage = calculateCompletion();

  if (isDismissed || completionPercentage === 100) return null;

  return (
    <div className={styles.bannerContainer}>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => setIsDismissed(true)}
        aria-label="Close banner"
      >
        <X size={18} />
      </button>

      <div className={styles.textRow} onClick={onBannerClick} style={{ cursor: "pointer" }}>
        <h3 className={styles.bannerTitle}>
          Complete your profile to unlock team features
        </h3>
        <ArrowRight size={20} className={styles.arrowIcon} />
      </div>

      <div className={styles.progressRow}>
        <div className={styles.progressWrapper}>
          <ProgressBar
            now={completionPercentage}
            className={styles.customProgress}
          />
        </div>
        <span className={styles.percentageText}>{completionPercentage}%</span>
      </div>
    </div>
  );
}