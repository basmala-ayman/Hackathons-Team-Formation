import React, { useState } from "react";
import styles from "./Register.module.css";
import loginStyles from "../Login/Login.module.css";
import AuthLayout from "../AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import { GoogleIcon, GithubIcon } from "../Login/Login";
import Login from "./../Login/Login";
import { Link } from "react-router-dom";

export default function Register() {
  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    let newErrors = {};
    // if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";

    setErrors(newErrors);
  };

  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <AuthLayout>
      <div className={loginStyles.loginContainer}>
        <h2 className={loginStyles.title}>Create your account</h2>

        <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
          <button type="button" className={loginStyles.socialBtn}>
            <GoogleIcon /> Sign Up with Google
          </button>
          <button type="button" className={loginStyles.socialBtn}>
            <GithubIcon /> Sign Up with Github
          </button>
        </div>

        <div className={loginStyles.divider}>
          <span>Or register with email</span>
        </div>

        <form
          onSubmit={handleRegister}
          noValidate
          className={loginStyles.formStack}
        >
          {/* Email */}
          <div className={loginStyles.inputWrapper}>
            <Input
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleChange(setEmail, "email")}
              error={errors.email}
              required
            />
          </div>

          {/* Password */}
          <div className={loginStyles.inputWrapper}>
            <Input
              label="Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={handleChange(setPassword, "password")}
              error={errors.password}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className={loginStyles.inputWrapper}>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword, "confirmPassword")}
              error={errors.confirmPassword}
              required
            />
          </div>
          <div className={styles.checkboxWrapper}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id="agree-check-box"
            />

            <label className={styles.checkboxLabel} htmlFor="agree-check-box">
              I agree to the <span>Terms & Conditions</span>
            </label>
          </div>

          <button type="submit" className="primary-btn w-100 mt-2">
            Create Account
          </button>

          <p className={loginStyles.footerText}>
            Already have an account?{" "}
            <Link to="/" className={loginStyles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
