import { useState } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";

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
  const hackathonList{

  }
  return (
    <div>
      {/* <ProTips></ProTips> */}
      <Stepper></Stepper>
      <Step1_TeamBasics
        formData={formData}
        setFormData={setFormData}
        onNext={""}
        hackathonList={"hackathonList"}
      ></Step1_TeamBasics>
    </div>
  );
}

export default CreateTeam;
