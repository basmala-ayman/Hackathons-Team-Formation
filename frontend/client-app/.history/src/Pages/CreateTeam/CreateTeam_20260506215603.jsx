import { useState } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from "./Components/TeamSteps/Step2_AddMembers";
import Step3_RequiredSkills from "./Components/TeamSteps/Step3_RequiredSkills";
import { CheckIcon, CodeIcon } from "../../assets/Icons";

function CreateTeam() {

  const teamSteps=[
    {title:"Team Basics" , icon:<TeamMeetIcon/>},
    {title:"Build Your Team" , icon:<AddMemberIcon/>},
    {title:"Required Skills" , icon:<CodeIcon/>},
    {title:"Final Details" , icon:<CheckIcon color=""/>},


  ]

  //dummy data
  const apiSkills = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' }
  ];

  const [formData, setFormData] = useState({
    teamName: "",
    hackathonName: "",
    description: "",
    teamSize: 4,
    members: [],
    skills: [],
  });

  const onNext = () => {};
  const onPrev = () => {};
  const currentUser={};

  const hackathonList = [{}];
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

        <Step3_RequiredSkills formData={formData} 
          setFormData={setFormData} 
          onNext={onNext}
          onPrev={onPrev}
          apiSkills={apiSkills}></Step3_RequiredSkills>
      </div>
    </div>
  );
}

export default CreateTeam;
