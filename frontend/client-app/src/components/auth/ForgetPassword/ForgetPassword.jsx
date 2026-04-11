import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgetPassword.module.css";
import loginStyles from "../Login/Login.module.css";
import AuthLayout from "../AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Reset link sent");
    }
  };

  return (
    <AuthLayout
      formClass={styles.smallFormContainer}
      imgClass={styles.immgIllustration}
    >
      <div className={styles.forgetContainer}>
        <Link to="/" className={styles.backLink}>
          ← Back to Login
        </Link>

        <h2 className={styles.title}>Forgot Password?</h2>

        <p className={styles.description}>
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Input
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
          </div>

          <button type="submit" className="primary-btn w-100">
            Send Reset Link
          </button>
        </form>

        <p className={styles.footerText}>
          Remember your password?{" "}
          <Link to="/" className={loginStyles.link}>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
