import React, { useState } from "react";
import styles from "./Login.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { GoogleIcon, GithubIcon } from "../Google_Github_Icons";
import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Logic to use later when handling the login with Google 
  const handleGoogleLogin = useGoogleLogin({
    // onSuccess: async (tokenResponse) => {
    onSuccess: async () => {
      //   try {

      //     const res = await axios.post("http://localhost:3000/api/auth/google", {
      //       access_token: tokenResponse.access_token
      //     });

      //     console.log("Server Response:", res.data);

      //     // FIX 3: Your friend's backend might send 'status: "success"' or just the token
      //     if (res.data.token) {
      //       localStorage.setItem("token", res.data.token);
      //       // navigate("/dashboard"); 
      //       alert("Login Successful!");
      //     }
      //   } catch (err) {
      //     // Log the actual error response from the server to help your friend debug
      //     console.error("Backend Google Auth Failed:", err.response?.data || err.message);
      //   }
      // },
      // onError: (error) => console.log('Login Failed:', error),
      alert("Google Login Hook Initialized")
    }
  });


  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Welcome Back!</h2>
        {/* Social Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
          <button type="button" className={styles.socialBtn} onClick={handleGoogleLogin}>
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
            required
          />

          <div className="text-start mb-4">
            <Link to="/forgetpassword" className={styles.forgotLink}>
              Forget Password?
            </Link>
          </div>

          <CustomButton type="submit" variant="primary" className="w-100" onClic={handleLogin}>
            Login
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
