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
  // Create a safe handler
  const handleClick = (e) => {
    // If it's a submit button, we let the form handle it
    // If an onClick was provided, we run it
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${styles["base-btn"]} 
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
