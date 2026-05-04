import styles from "./HowItWorks.module.css";
function Steps({ id, title, icon }) {
   const IconComponent=icon;
  return (
    
      <div className={styles.stepWrapper}>
        <span className={styles.badge}>{id}</span>
        <div className="mb-1 text-primary">
          <IconComponent size={64} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>

  );
}

export default Steps;
