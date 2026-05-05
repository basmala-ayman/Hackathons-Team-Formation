import import ProTips from './Components/Sidebar/ProTips'
import Stepper from './Components/Stepper/Stepper'

function CreateTeam() {
  const [formData, setFormData] = useState({
  teamName: '',
  hackathonName: '', // Initialized as empty string
  description: '',
  teamSize: 4,       // Initialized with a default value (e.g., 4)
  members: [],
  skills: []
});
  return (
    <div>
      {/* <ProTips></ProTips> */}
      <Stepper></Stepper>
    </div>
  )
}

export default CreateTeam
