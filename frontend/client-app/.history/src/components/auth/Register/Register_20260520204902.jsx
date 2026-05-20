import React, { useState } from "react";
import styles from "./Register.module.css";
import loginStyles from "../Login/Login.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import {
  GoogleIcon,
  GithubIcon,
} from "../../../shared/Icons/GoogleGithubIcons.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { popUp } from "../../../utils/popUp.js";
import { Modal } from "react-bootstrap";
import { useFormHandler } from "../../../hooks/useFormHandler.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useLocalStorage("reg_firstName", "");
  const [lastName, setLastName] = useLocalStorage("reg_lastName", "");
  const [email, setEmail] = useLocalStorage("reg_email", "");
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { errors, setErrors, handleChange } = useFormHandler({});

  const handleCloseTerms = () => setShowTerms(false);

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    let newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!agreed) {
      popUp.error("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const userData = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
      };
      await register(userData);
      setFirstName("");
      setLastName("");
      // localStorage.setItem("tempEmail", email);
      popUp.warn(
        "One more step! Please check your email to verify your account.",
      );
      navigate("/verify-email");
    } catch (err) {
      console.log("Error inside Register.jsx:", err);
      if (
        err.status === 409 ||
        err.message?.toLowerCase().includes("User already exists")
      ) {
        popUp.warn("This email is already registered. Try logging in!");
      } else {
        // Fallback for other errors
        popUp.error(err.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className={loginStyles.loginContainer}>
        <h2 className={loginStyles.title}>Create your account</h2>

        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
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
          <div className="d-flex gap-2 mb-3">
            <div className="flex-grow-1">
              <Input
                label="First Name"
                type="text"
                placeholder="Hafsa"
                value={firstName}
                onChange={handleChange("firstName", setFirstName)}
                error={errors.firstName}
                required
              />
            </div>
            <div className="flex-grow-1">
              <Input
                label="Last Name"
                type="text"
                placeholder="Hikal"
                value={lastName}
                onChange={handleChange("lastName", setLastName)}
                error={errors.lastName}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className={loginStyles.inputWrapper}>
            <Input
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleChange("email", setEmail)}
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
              onChange={handleChange("password", setPassword)}
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
              onChange={handleChange("confirmPassword", setConfirmPassword)}
              error={errors.confirmPassword}
              required
            />
          </div>

          <div className={styles.checkboxWrapper}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id="agree-check-box"
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className={styles.checkboxLabel} htmlFor="agree-check-box">
              I agree to the{" "}
              <span
                onClick={() => setShowTerms(true)}
                style={{
                  cursor: "pointer",
                  color: "var(--color-primary)",
                  textDecoration: "underline",
                  fontWeight: "600",
                }}
              >
                Terms & Conditions
              </span>
            </label>
          </div>

          <CustomButton type="submit" variant="primary" className="mt-2 w-100">
            Create Account
          </CustomButton>

          <p className={loginStyles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={loginStyles.link}>
              Login
            </Link>
          </p>
        </form>

        <Modal
          show={showTerms}
          onHide={handleCloseTerms}
          centered
          size="lg"
          contentClassName={styles.termsModal}
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold px-3 pt-3">
              Terms & Conditions
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4 pb-4">
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <h4 className="mt-3">1. Introduction</h4>
              <p className="text-muted fs-5">
                Welcome to TeamCatalyst. By creating an account, you agree to
                follow our community guidelines...
              </p>

              <h4 className="mt-4">2. Privacy Policy</h4>
              <p className="text-muted fs-5">
                We value your privacy. Your data (name, email) is used only to
                personalize your experience and for AI-based team formation...
              </p>

              <h4 className="mt-4">3. User Conduct</h4>
              <p className="text-muted fs-5">
                You agree not to use the platform for any illegal activities or
                to harass other team members...
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer className="border-0 pt-0">
            <CustomButton
              variant="primary"
              className="px-5 mb-3 sm-btn"
              onClick={handleCloseTerms}
            >
              I Understand
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </div>
    </AuthLayout>
  );
}
