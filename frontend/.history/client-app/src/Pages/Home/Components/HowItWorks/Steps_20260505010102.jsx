import styles from "./HowItWorks.module.css";
function Steps({ id, title, icon }) {
   const IconComponent=icon;
  return (
    
      <div className={styles.stepWrapper}>
        <span className={styles.badge}>{id}</span>
        <span>
          <IconComponent size={64} />
        </span>
        <span>{title}</span>
      </div>

  );
}

export default Steps;
