import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css";
import loginStyles from "../Login/Login.module.css";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Input from "../../../shared/Input/Input";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { popUp } from "../../../utils/popUp.js";
import { useFormHandler } from "../../../hooks/useFormHandler.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

export default function ForgetPassword() {
  // const [email, setEmail] = useState("");
  const [email, setEmail] = useLocalStorage("resetEmail", "");
  // const [errors, setErrors] = useState({});
  const { forgotPassword, isSubmitting } = useAuth();
  const navigate = useNavigate();
  const { errors, setErrors, handleChange } = useFormHandler({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
      setErrors(validationErrors);
      return;
    }
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return;
    // }
    try {
      await forgotPassword(email);
      popUp.success("Reset link sent successfully!");
      navigate("/emailsent");
    } catch (err) {
      popUp.error(err.message);
    }
  };

  return (
    <AuthLayout
      formClass={styles.smallFormContainer}
      imgClass={styles.immgIllustration}
    >
      <div>
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
              onChange={handleChange("email", setEmail)}
              error={errors.email}
              required
            />
          </div>

          <CustomButton type="submit" variant="primary" className="w-100">
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </CustomButton>
        </form>

        <p className={styles.footerText}>
          Remember your password?{" "}
          <Link to="/login" className={loginStyles.link}>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
