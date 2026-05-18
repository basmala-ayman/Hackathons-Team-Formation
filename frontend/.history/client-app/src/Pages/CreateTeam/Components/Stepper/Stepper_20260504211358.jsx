import styles from './Stepper.module.css'
import {TeamIcon , CheckIcon , ProfileIcon , AddMemberIcon} from '../../../../assets/Icons'
function Stepper() {

    const STEPS_DATA = [
  { id: 1, label: "Team Basics", icon:<TeamIcon/> },
  { id: 2, label: "Add Members", icon: <HiUserAdd /> },
  { id: 3, label: "Required Skills", icon: <HiCheckBadge /> },
  { id: 4, label: "Final Details", icon: <HiFlag /> },
];
  return (
    <div>
      
    </div>
  )
}

export default Stepper
