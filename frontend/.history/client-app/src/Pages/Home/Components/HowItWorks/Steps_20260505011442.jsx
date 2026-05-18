import styles from "./Steps.module.css";
function Steps({ id, title, icon, isLast }) {
   const IconComponent=icon;
  return (
    
      <div className={~} >
        <span className={styles.badge}>{id}</span>
        <div className="mb-2 ">
          <IconComponent size={64} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>

  );
}

export default Steps;
