import styles from "./HowItWorks.module.css";
function Steps() {

  return (
    <div className={styles.stepsContainer}>
   
        return(
            <div key={step.id} className={styles.stepWrapper}>
                <span className={styles.badge}>{step.id}</span>
                <span>
                     <IconComponent 
                    size={64}
                    />
                </span>

            </div>
        )
      )
    </div>
  );
}

export default Steps;
