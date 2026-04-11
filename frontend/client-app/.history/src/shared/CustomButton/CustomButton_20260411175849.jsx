import styles from "./CustomButton.module.css";

function CustomButton({ children, onClick, variant = "primary", size = "md",       
  type = "button",     // Prevents accidental form submissions
  disabled = false,    // Allows the button to be turned off
  className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn}  ${styles[`${variant}-btn`]}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
