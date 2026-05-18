import { useState } from 'react';
import ProTips from './Components/Sidebar/ProTips'
import Stepper from './Components/Stepper/Stepper'

function CreateTeam() {
  const [formData, setFormData] = useState({
  teamName: '',
  hackathonName: '', 
  description: '',
  teamSize: 4,      
  members: [],
  skills: []
});
  return (
    <div>
      {/* <ProTips></ProTips> */}
      <Stepper></Stepper>
      <Step
    </div>
  )
}

export default CreateTeam
