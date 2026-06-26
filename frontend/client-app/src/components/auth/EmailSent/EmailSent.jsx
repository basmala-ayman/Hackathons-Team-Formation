import React from "react";
// import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { popUp } from "../../../utils/popUp";
import { Mail } from "lucide-react";
import styles from "./EmailSent.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function EmailSent() {
  // const location = useLocation();
  // // Email will come later from backend
  // const email = location.state?.email || "example@gmail.com";
  const navigate = useNavigate();
  const [email] = useLocalStorage("resetEmail", "");
  const { forgotPassword, isSubmitting } = useAuth();


  const handleTryAgain = async () => {
    try {
      await forgotPassword(email);
      popUp.success("Reset link sent successfully!");
    } catch (err) {
      popUp.error(err.message);
    }
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
          onClick={() => navigate("/login")}
        >
          Back to Login
        </CustomButton>
        <p className={styles.footerText}>
          Didn't receive the email?{" "}
          <button
            type="button"
            className={styles.tryAgainBtn}
            onClick={handleTryAgain}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Try Again"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
