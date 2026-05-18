import React, { useState } from "react";
import styles from "./CompleteProfile.module.css"
import { X, ArrowRight } from "lucide-react";
import { ProgressBar } from "react-bootstrap"

export default function CompleteProfile({onBannerClick}) {
  const [isDisplayed, setIsDisplayed] = useState(true)
  const completionPercentage = 20;
  if (!isDisplayed) return null;
  
  return (
    <div className={styles.bannerContainer}>
      <button
        className={styles.closeBtn}
        onClick={() => setIsDisplayed(false)}
        aria-label="Close banner"
      >
        <X size={18} />
      </button>

      <div className={styles.textRow} onClick={onBannerClick}>
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