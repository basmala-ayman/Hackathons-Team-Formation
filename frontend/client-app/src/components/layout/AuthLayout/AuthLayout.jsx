import React from "react";
import styles from "./AuthLayout.module.css";
import authImg from "../../../assets/authImg.png";

export default function AuthLayout({
  children,
  formClass = "",
  imgClass = "",
}) {
  return (
    <div className="container  min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`row g-4 ${styles.authRow}`}>
        {/* Left Side: Illustration */}
        <div
          className={`d-none d-lg-flex col-lg-6 align-items-center justify-content-center ${styles.imageWrapper}`}
        >
          <img
            src={authImg}
            alt="Illustration"
            className={`${styles.authImage} ${imgClass}`}
          />
        </div>

        {/* Right Side: Form Content Card */}
        <div className="col-12 col-lg-6 d-flex">
          <div className={` ${styles.formContainer} ${formClass}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
