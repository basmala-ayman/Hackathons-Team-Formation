import styles './'
import { useState } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from "./Components/TeamSteps/Step2_AddMembers";
import Step3_RequiredSkills from "./Components/TeamSteps/Step3_RequiredSkills";
import Step4_FinalDetails from "./Components/TeamSteps/Step4_FinalDetails";
import {
  TeamMeetIcon,
  AddMemberIcon,
  CheckIcon,
  CodeIcon,
} from "../../assets/Icons";

function CreateTeam() {

  //dummy data
    const apiSkills = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' }
  ];
  const currentUser = { name: "Zeina", role: "Full-Stack Developer", profilePic: null };
  const hackathonList = [{ value: "CodeX", label: "CodeX" }, { value: "TechFest", label: "TechFest" }];

  //states
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    teamName: "",
    hackathonName: "",
    description: "",
    teamSize: 4,
    members: [],
    skills: [],
  });
  const createSteps = [
    { id: 1, title: "Team Basics", icon: <TeamMeetIcon /> },
    { id: 2, title: "Build Your Team", icon: <AddMemberIcon /> },
    { id: 3, title: "Required Skills", icon: <CodeIcon /> },
    {
      id: 4,
      title: "Final Details",
      icon: <CheckIcon color="var(--color-primary-dark)" />,
    },
  ];

  //functions
  const handleNextStep = () => {
    setCurrentStep((curr) => curr + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep((curr) => curr - 1);
  };
  const handleCreateTeam = () => {
    console.log("Final Submission to API:", formData);
    // API Call 
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_TeamBasics
            formData={formData}
            setFormData={setFormData}
            hackathonList={hackathonList}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <Step2_AddMembers
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        );
      case 3:
        return (
          <Step3_RequiredSkills
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            apiSkills={apiSkills}
          />
        );
      case 4:
        return (
          <Step4_FinalDetails
            formData={formData}
            onPrev={handlePrevStep}
            onSubmit={handleCreateTeam}
          />
        );
      default:
        return null;
    }
  };
  return (
   <div className={styles.pageContainer}>
      <div className="container py-5">
        <Stepper currentStep={currentStep} steps={createSteps} />

        <div className={styles.mainGrid}>
          {/* LEFT COLUMN: The Form Card */}
          <div className={styles.formColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.headerIcon}>{createSteps[currentStep - 1].icon}</span>
                <h3 className={styles.headerTitle}>{createSteps[currentStep - 1].title}</h3>
              </div>
              <div className={styles.cardBody}>
                {renderStep()}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar with Quick Stats & Pro Tips */}
          <aside className={styles.sidebarColumn}>
            {/* QuickStats needs formData to show "1/4 Members" or "3 Skills" */}
            <QuickStats formData={formData} />
            <ProTips currentStep={currentStep} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
