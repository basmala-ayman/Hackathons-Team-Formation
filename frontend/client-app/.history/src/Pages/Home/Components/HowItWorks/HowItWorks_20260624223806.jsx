import styles from "./HowItWorks.module.css";
import { ProfileIcon, TeamIcon, SparkleIcon } from "../../../../assets/Icons";
import Steps from "./Steps";

function HowItWorks() {
  const STEPS = [
    { id: 1, title: "Create your profile", icon: ProfileIcon },
    { id: 2, title: "Create a team", icon: TeamIcon },
    { id: 3, title: "AI Recommends Teams", icon: SparkleIcon },
  ];
  return (
    <div className={`${styles.containerWrapper}  py-5 text-center`}>
      <section className="mb-5">
        <h1 className={fw-bold my-5 fs-1">How It Works</h1>
        <p>Three simple steps to build your personalized hackathon team</p>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Steps id={step.id} title={step.title} icon={step.icon} isLast={index === STEPS.length - 1}></Steps>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
