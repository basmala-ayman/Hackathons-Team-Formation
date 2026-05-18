import React from "react";
import { CheckCircle, X } from "lucide-react";
import styles from "./popups.module.css";

export default function SuccessPopup({ handleClose }) {
  return (
    <div className={styles.popupContainer}>
      <button onClick={handleClose} className={styles.closeBtn} aria-label="Close">
        <X size={20} />
      </button>
      <div className={styles.iconWrapper}>
        <CheckCircle size={64} strokeWidth={1.5} className={styles.successIcon} />
      </div>
      <h3 className={`${styles.title} fw-bold mb-3`}>Profile Completed Successfully!</h3>
      <p className={`${styles.subText} text-muted fs-5 mb-0`}>
        Your professional links and portfolio have been saved. You're all set to get started!
      </p>
    </div>
  );
}