import React, { useState } from "react";
import styles from "./CompleteProfile.module.css";
import { X, ArrowRight } from "lucide-react";
import { ProgressBar } from "react-bootstrap";

export default function CompleteProfile({ onBannerClick, user }) {
  const [isDisplayed, setIsDisplayed] = useState(true);

  const calculateCompletion = () => {
    if (!user) return 20;

    let stepsCompleted = 0;
    const totalSteps = 5;

    if (user.name && user.name.trim() !== "") stepsCompleted++;
    if (user.bio && user.bio.trim() !== "") stepsCompleted++;

    const hasTechSkills = Array.isArray(user.technicalSkills) ? user.technicalSkills.length > 0 : !!user.technicalSkills;
    if (hasTechSkills) stepsCompleted++;

    if (user.linkedin || user.linkedinUrl) stepsCompleted++;
    if (user.avatar || user.profilePicture) stepsCompleted++;

    const percentage = Math.round((stepsCompleted / totalSteps) * 100);

    return Math.max(20, Math.min(percentage, 100));
  };

  const completionPercentage = calculateCompletion();

  if (!isDisplayed || completionPercentage === 100) return null;

  return (
    <div className={styles.bannerContainer}>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => setIsDisplayed(false)}
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