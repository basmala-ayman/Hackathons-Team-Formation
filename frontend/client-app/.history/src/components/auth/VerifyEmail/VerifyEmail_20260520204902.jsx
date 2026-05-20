import React from "react";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import styles from "./VerifyEmail.module.css";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { Mail } from "lucide-react";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { popUp } from "../../../utils/popUp.js";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useFormHandler } from "../../../hooks/useFormHandler.js";
export default function VerifyEmail() {
  const { resendVerification, isSubmitting } = useAuth();

  // const email = localStorage.getItem("tempEmail") || "your email address";
  const [email] = useLocalStorage("reg_email", "your email address");
  const { setErrors } = useFormHandler({});

  const handleResend = async () => {
    try {
      await resendVerification(email);
      popUp.success("Verification email sent! Check your inbox.");
    } catch (err) {
      popUp.error(err.message || "Failed to resend email.");
      setErrors({ resend: err.message });
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

        <h2 className={styles.title}>Check your email</h2>

        <p className={styles.description}>
          We sent a verification link to <br />
          <strong>{email}</strong> <br />
          Please click the link to activate your account.
        </p>

        <CustomButton
          variant="primary"
          className="w-100 mb-4"
          onClick={handleResend}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Resend Email"}
        </CustomButton>

        <p className={styles.footerText}>
          Entered the wrong email?{" "}
          <Link to="/register" className={styles.backLink}>
            Go back
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
