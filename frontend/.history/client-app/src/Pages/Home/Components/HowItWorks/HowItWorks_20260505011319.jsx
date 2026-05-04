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
        <h2 className="fw-bold my-5 fs-1">How It Works</h2>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Steps id={step.id} title={step.title} icon={step.icon} isLast={}></Steps>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
