import styles from "./CustomButton.module.css";

function CustomButton({ text, variant, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`d-flex justify-content-center align-items-center ${styles[`${variant}-btn`]}`}
    >
      {text}
    </button>
  );
}

export default CustomButton;
