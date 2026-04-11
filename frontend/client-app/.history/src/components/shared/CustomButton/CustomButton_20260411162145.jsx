import styles from "./CustomButton.module.css";

function CustomButton({ children, variant, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn d-flex justify-content-center align-items-center ${styles[`${variant}-btn`]}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
