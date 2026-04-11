import styles from "./CustomButton.module.css";

function CustomButton({ text, variant, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`d-flex justify-content-center align-items-center ${styles[`${variant}-btn`]}`}
    >
      {text}
    </div>
  );
}

export default CustomButton;
