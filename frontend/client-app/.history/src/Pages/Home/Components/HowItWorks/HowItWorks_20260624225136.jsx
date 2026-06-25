import styles from "./HowItWorks.module.css";
import { ProfileIcon, TeamIcon, SparkleIcon ,TeamMeetIcon} from "../../../../assets/Icons";
import Steps from "./Steps";

function HowItWorks() {
  const STEPS = [
    { id: 1, title: "Complete your profile", icon: ProfileIcon },
    { id: 2, title: "Set your team requirements", icon: TeamIcon },
    { id: 3, title: "Get AI-matched teammates", icon: SparkleIcon },
    { id: 4, title: "Choose the best match", icon: TeamMeetIcon },

  ];
  return (
    <div className={`${styles.containerWrapper}  py-5 text-center`}>
      <section className="mb-5">
        <h2 className="fw-bold mb-3" style={{ fontSize: "var(--fs-h2)" }}>How It Works</h2>
        <pclassName="text-muted" style={{ fontSize: "var(--fs-regular)" }}> Simple steps to build your personalized hackathon team</pclassName=>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 mt-5">
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
