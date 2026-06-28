import React, { useState } from "react";
import styles from "./Input.module.css"; // Imported as 'styles' object

export default function Input({
  label,
  type = "text",
  placeholder,
  required = true,
  helperText,
  value,
  error,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      <div className={styles.fieldContainer}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.inputField} ${error ? styles.inputError : ""}`}
        />

        {isPassword && (
          <div
            className={styles.iconRight}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
          </div>
        )}
      </div>

      {/* Logic to show error message or helper text */}
      {error ? (
        <span className={styles.errorText}>{error}</span>
      ) : (
        helperText && <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
}
