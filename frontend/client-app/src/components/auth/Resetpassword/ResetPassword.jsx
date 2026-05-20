import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import loginStyles from "../Login/Login.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { popUp } from "../../../utils/popUp.js";
import { useFormHandler } from "../../../hooks/useFormHandler.js";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const { errors, setErrors, handleChange } = useFormHandler({});
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (!token) {
      popUp.error("Invalid or expired reset token link.");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmittingLocal(true);
      await resetPassword({ token, password });
      popUp.success("Password updated successfully! Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Reset error:", err);
      popUp.error(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsSubmittingLocal(false);
    }
  };

  return (
    <AuthLayout
      formClass={styles.smallFormContainer}
      imgClass={styles.immgIllustration}
    >
      <div className={styles.resetContainer}>
        <h2 className={styles.title}>Create New Password</h2>

        <p className={styles.description}>
          Your identity has been verified. Please enter your new strong password below to secure your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Input
              label="New Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={handleChange("password", setPassword)}
              error={errors.password}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={handleChange("confirmPassword", setConfirmPassword)}
              error={errors.confirmPassword}
              required
            />
          </div>

          <CustomButton type="submit" variant="primary" className="w-100" disabled={isSubmittingLocal}>
            {isSubmittingLocal ? "Updating..." : "Reset Password"}
          </CustomButton>
        </form>

        <p className={styles.footerText}>
          Back to{" "}
          <Link to="/login" className={loginStyles.link}>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}