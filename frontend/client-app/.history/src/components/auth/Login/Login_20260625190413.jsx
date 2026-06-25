import React, { useState } from "react";
import styles from "./Login.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import {
  GoogleIcon,
  GithubIcon,
} from "../../../shared/Icons/GoogleGithubIcons.jsx";
import { useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { popUp } from "../../../utils/popUp.js";
import { useFormHandler } from "../../../hooks/useFormHandler.js";

export default function Login() {
  
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  const { login, googleLogin, isSubmitting } = useAuth();

  const { errors, setErrors, handleChange } = useFormHandler({});

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleLogin(tokenResponse.access_token);
        navigate("/");
      } catch {
        setErrors({ google: "Google login failed" });
      }
    },
  });

  const handleLogin = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
      e.stopPropagation();
    }

    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await login({ email, password });
      if (result) {
        const userName = result.user?.name || "User";
        popUp.success(`Welcome, ${userName}!`);
        // navigate("/", { replace: true });
        const userEmail=result.user?.email|| email;
        if (userEmail === "team.catalyst26@gmail.com"){
          navigate("/admin-dashboard" ,{ replace: true });
        }
        else{
          navigate("")
        }
      }
    } catch (err) {
      // Check the error status or response message
      const status = err.status || err.response?.status;

      // If the backend returns 401 (Unauthorized), it's usually bad credentials
      if (status === 401) {
        popUp.error("Incorrect email or password.");
      }
      // Handle "Account not found" 
      else if (status === 404) {
        popUp.warn("We couldn't find your account, please register first.");
      }
      // Default fallback
      else {
        popUp.error("Incorrect email or password.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Welcome Back!</h2>
        {/* Social Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
          <button
            type="button"
            className={styles.socialBtn}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon /> Sign In with Google
          </button>
          <button type="button" className={styles.socialBtn}>
            <GithubIcon /> Sign In with Github
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
            error={errors.email}
            onChange={handleChange("email", setEmail)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChange("password", setPassword)}
            error={errors.password}
            required
          />

          <div className="text-start mb-4">
            <Link to="/forgetpassword" className={styles.forgotLink}>
              Forget Password?
            </Link>
          </div>

          <CustomButton
            type="submit"
            variant="primary"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </CustomButton>

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
