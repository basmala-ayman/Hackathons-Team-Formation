import styles from "./HowItWorks.module.css";
import { ProfileIcon, TeamIcon, SparkleIcon } from "../../../../assets/Icons";
function Steps() {

  return (
    <div className={styles.stepsContainer}>
      {STEPS.map((step) => {
        const IconComponent = step.icon;
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
      })}
    </div>
  );
}

export default Steps;
