import styles from "./CustomButton.module.css";

function CustomButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles['base-btn']} 
        ${styles[`${variant}-btn`]} 
        ${styles[`${size}-btn`]} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default CustomButton;
