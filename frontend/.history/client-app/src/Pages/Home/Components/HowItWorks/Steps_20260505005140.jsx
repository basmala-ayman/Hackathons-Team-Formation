import styles from "./HowItWorks.module.css";
import { ProfileIcon, TeamIcon, SparkleIcon } from "../../../../assets/Icons";
function Steps() {
  const STEPS = [
    { id: 1, title: "Create your profile", icon: ProfileIcon },
    { id: 2, title: "Create a team", icon: TeamIcon },
    { id: 3, title: "AI Recommends Teams", icon: SparkleIcon },
  ];
  return (
    <div className={styles.stepsContainer}>
      {STEPS.map((step) => {
        const IconComponent = step.icon;
        return(
            <div key={step.id} className={styles.stepWrapper}>
                <span className={styles.badge}>{step.id}</span>
                <span>
                     <IconComponent 
                    color={isActive ? "#FFFFFF" : "var(--color-primary-dark)"} 
                    size={24}
                    isActive={isActive} 
                </span>

            </div>
        )
      })}
    </div>
  );
}

export default Steps;
