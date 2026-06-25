import React from "react";
import styles from "./AuthLayout.module.css";

export default function AuthLayout({
  children,
  formClass = "",
}) {
  return (
    <div className={styles.page}>
      <div className={`${styles.authCard} ${formClass}`}>
        {children}
      </div>
    </div>
  );
}
