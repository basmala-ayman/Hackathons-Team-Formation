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
            
        )
      }
    </div>
  );
}

export default Steps;
