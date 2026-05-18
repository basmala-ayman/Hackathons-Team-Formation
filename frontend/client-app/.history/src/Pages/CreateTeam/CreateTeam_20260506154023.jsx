import { useState } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from './Components/TeamSteps/Step2_AddMembers'

function CreateTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    hackathonName: "",
    description: "",
    teamSize: 4,
    members: [],
    skills: [],
  });

  const onNext=()=>{

  }
  const hackathonList=[{

  }]
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
      
<Step2_AddMembers formData={formData} setFormData={setFormData)
  onNext
  onPrev
  currentUser></Step2_AddMembers>
      </div>
    </div>
  );
}

export default CreateTeam;
