import React from "react";
import { Hand, X } from "lucide-react";
import styles from "./popups.module.css";
import CustomButton from './../../../shared/CustomButton/CustomButton';

export default function WarningPopup({ handleBack, handleClose }) {
  return (
    <div className={styles.popupContainer}>
      <button onClick={handleClose} className={styles.closeBtn} aria-label="Close">
        <X size={20} />
      </button>
      <div className={styles.iconWrapper}>
        <div className={styles.warningCircle}>
          <Hand size={45} strokeWidth={2.5} />
        </div>
      </div>
      <h3 className={`${styles.title} fw-bold mb-4 fs-2`}>Please add your skills to continue</h3>
      <CustomButton
        onClick={handleBack}
        size="sm"
        className="w-50"
      >
        Ok
      </CustomButton>
    </div>
  );
}