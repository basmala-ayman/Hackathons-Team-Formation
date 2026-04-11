import styles from "./CustomButton.module.css";

function CustomButton({ children, variant, onClick }) {
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
