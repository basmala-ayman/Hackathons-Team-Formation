import React from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { popUp } from "../../../utils/popUp";
import { Mail } from "lucide-react";
import styles from "./EmailSent.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function EmailSent() {
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
        <div className={styles.iconCircle}>
          <Mail size={24} color="white" />
        </div>
        <h2 className={styles.title}>Check Your Email</h2>
        <p className={styles.description}>
          We've sent a password reset link to
          <br />
          <strong>{email}</strong>
          <br />
          Click the link in the email to reset your password.
          <br />
          If you don't see it, check your spam folder.
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
