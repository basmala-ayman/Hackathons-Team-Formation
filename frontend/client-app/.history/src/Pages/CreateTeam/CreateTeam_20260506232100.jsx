import { useState } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from "./Components/TeamSteps/Step2_AddMembers";
import Step3_RequiredSkills from "./Components/TeamSteps/Step3_RequiredSkills";
import Step4_FinalDetails from "./Components/TeamSteps/Step4_FinalDetails";
import {TeamMeetIcon,AddMemberIcon, CheckIcon, CodeIcon } from "../../assets/Icons";

function CreateTeam() {

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
    { id: 4, title: "Final Details", icon: <CheckIcon color="var(--color-primary-dark)" /> },
  ];
  const handleNextStep=()=>{setCurrentStep((curr)=>curr+1)}
  const handlePrevStep=()=>
  return (
    <div>
      {/* <ProTips></ProTips> */}
      <div className="container py-5">
        <Stepper></Stepper>
        {/* <Step1_TeamBasics
        formData={formData}
        setFormData={setFormData}
        onNext={onNext}
        hackathonList={hackathonList}
      ></Step1_TeamBasics> */}

        {/* <Step2_AddMembers
          formData={formData}
          setFormData={setFormData}
          onNext={onNext}
          onPrev={onPrev}
          currentUser={currentUser}
        ></Step2_AddMembers> */}

        {/* <Step3_RequiredSkills formData={formData} 
          setFormData={setFormData} 
          onNext={onNext}
          onPrev={onPrev}
          apiSkills={apiSkills}></Step3_RequiredSkills> */}
          <Step4_FinalDetails formData={formData}  onNext={onNext}
          onPrev={onPrev}></Step4_FinalDetails>
      </div>
    </div>
  );
}

export default CreateTeam;
