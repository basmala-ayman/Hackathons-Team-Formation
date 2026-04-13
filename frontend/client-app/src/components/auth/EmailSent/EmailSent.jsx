import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import styles from "./EmailSent.module.css";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function EmailSent() {
  const location = useLocation();
  const navigate = useNavigate();
  // Email will come later from backend
  const email = location.state?.email || "example@gmail.com";

  const handleTryAgain = () => {
    // Later I will call backend to resend API here
    console.log("Resend reset password email");
  };

  return (
    <AuthLayout
      formClass={styles.smallFormContainer}
      imgClass={styles.immgIllustration}
    >
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Mail size={40} strokeWidth={2} />
        </div>
        <h2 className={styles.title}>Check Your Email</h2>
        <p className={styles.description}>
          We've sent a password reset link to:
        </p>
        <p className={styles.email}>{email}</p>
        <p className={styles.helperText}>
          Click the link in the email to reset your password. If you don't see
          it, check your spam folder.
        </p>
        <CustomButton
          variant="primary"
          className="w-100 mt-4"
          onClick={() => navigate("/")}
        >
          Back to Login
        </CustomButton>
        <p className={styles.footerText}>
          Didn't receive the email?{" "}
          <button
            type="button"
            className={styles.tryAgainBtn}
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
