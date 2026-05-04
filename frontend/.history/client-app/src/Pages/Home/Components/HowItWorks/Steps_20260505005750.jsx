import styles from "./HowItWorks.module.css";
function Steps({ id, title, icon }) {
  return (
    <div className={styles.stepsContainer}>
      <div key={id} className={styles.stepWrapper}>
        <span className={styles.badge}>{id}</span>
        <span>
          <IconComponent size={64} />
        </span>
      </div>
    </div>
  );
}

export default Steps;
