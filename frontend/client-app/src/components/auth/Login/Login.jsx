import React, { useState } from "react";
import styles from "./Login.module.css";
import AuthLayout from "../AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import { Link } from "react-router-dom";

export const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    className="me-2"
  >
    <path
      opacity="0.987"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8144 1.59112C11.9019 1.46962 12.5454 1.46962 13.7139 1.59112C15.7823 1.89727 17.6997 2.85335 19.1889 4.32113C18.1825 5.27233 17.1894 6.23742 16.2099 7.21612C14.3339 5.62612 12.2399 5.25912 9.92785 6.11513C8.23185 6.89512 7.05085 8.15913 6.38485 9.90713C5.29651 9.09687 4.22235 8.26774 3.16285 7.42013C3.08922 7.38137 3.00512 7.36718 2.92285 7.37962C4.60585 4.13462 7.23585 2.20462 10.8129 1.58962"
      fill="#F44336"
    />
    <path
      opacity="0.997"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.91938 7.37978C3.00438 7.36678 3.08488 7.38028 3.16088 7.42028C4.22038 8.2679 5.29454 9.09703 6.38288 9.90728C6.21162 10.5884 6.10366 11.2838 6.06038 11.9848C6.09738 12.6628 6.20488 13.3283 6.38288 13.9813L3.00038 16.6738C1.52738 13.5958 1.50038 10.4978 2.91938 7.37978Z"
      fill="#FFC107"
    />
    <path
      opacity="0.999"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.0281 19.9341C17.9749 19.0053 16.8723 18.134 15.7251 17.3241C16.8751 16.5121 17.5731 15.3981 17.8191 13.9821H12.1836V10.0686C15.4336 10.0416 18.6821 10.0691 21.9291 10.1511C22.5451 13.4961 21.8336 16.5121 19.7946 19.1991C19.5521 19.4569 19.2953 19.7022 19.0281 19.9341Z"
      fill="#448AFF"
    />
    <path
      opacity="0.993"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.3825 13.9824C7.6125 17.0394 9.8675 18.4664 13.1475 18.2634C14.0682 18.1568 14.951 17.8352 15.7245 17.3244C16.8725 18.1364 17.9735 19.0064 19.0275 19.9344C17.3575 21.4351 15.2282 22.3255 12.987 22.4604C12.4778 22.5011 11.9662 22.5011 11.457 22.4604C7.639 22.0104 4.82 20.0814 3 16.6734L6.3825 13.9824Z"
      fill="#43A047"
    />
  </svg>
);

export const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    className="me-2"
  >
    <path
      d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C1.99917 14.0993 2.65874 16.1458 3.88603 17.849C5.11333 19.5522 6.84598 20.8254 8.83798 21.488C9.33798 21.575 9.52598 21.275 9.52598 21.012C9.52598 20.775 9.51298 19.988 9.51298 19.15C7.00098 19.613 6.35098 18.538 6.15098 17.975C6.03798 17.687 5.55098 16.8 5.12598 16.562C4.77598 16.375 4.27598 15.912 5.11298 15.9C5.90098 15.887 6.46298 16.625 6.65098 16.925C7.55098 18.437 8.98798 18.012 9.56298 17.75C9.65098 17.1 9.91298 16.663 10.201 16.413C7.97598 16.163 5.65098 15.3 5.65098 11.475C5.65098 10.387 6.03798 9.488 6.67598 8.788C6.57598 8.538 6.22598 7.513 6.77598 6.138C6.77598 6.138 7.61298 5.875 9.52598 7.162C10.3401 6.93664 11.1812 6.82327 12.026 6.825C12.876 6.825 13.726 6.937 14.526 7.162C16.439 5.862 17.276 6.138 17.276 6.138C17.826 7.513 17.476 8.538 17.376 8.788C18.013 9.488 18.401 10.375 18.401 11.475C18.401 15.313 16.064 16.163 13.839 16.413C14.201 16.725 14.514 17.325 14.514 18.263C14.514 19.6 14.501 20.675 14.501 21.013C14.501 21.275 14.689 21.587 15.189 21.487C17.1735 20.8161 18.8978 19.5401 20.1195 17.8384C21.3412 16.1367 21.9989 14.0948 22 12C22 6.475 17.525 2 12 2"
      fill="#2A2626"
    />
  </svg>
);
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
  };

  return (
    <AuthLayout>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Welcome Back!</h2>
        {/* Social Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
          <button type="button" className={styles.socialBtn}>
            <GoogleIcon /> Sign Up with Google
          </button>
          <button type="button" className={styles.socialBtn}>
            <GithubIcon /> Sign Up with Github
          </button>
        </div>
        <div className={styles.divider}>
          <span>Or login with email</span>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText="Make it strong — at least 8 characters with numbers and symbols."
            required
          />

          <div className="text-start mb-4">
            <Link to="/forgetpassword" className={styles.forgotLink}>
              Forget Password?
            </Link>
          </div>

          <button type="submit" className="btn primary-btn w-100">
            Login
          </button>

          <p className={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
