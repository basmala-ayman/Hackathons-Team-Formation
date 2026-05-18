import styles from './Stepper.module.css'
import {TeamIcon , CheckIcon , ProfileIcon , AddMemberIcon} from '../../../../assets/Icons'
function Stepper({currentStep}) {

    const STEPS_DATA = [
  { id: 1, label: "Team Basics", icon:<TeamIcon/> },
  { id: 2, label: "Add Members", icon: <AddMemberIcon/> },
  { id: 3, label: "Required Skills", icon: <CheckIcon/> },
  { id: 4, label: "Final Details", icon:  <CheckIcon/>},
];
  return (
   <div className={styles.stepperContainer}>
    {STEPS_DATA.map((step , index)=>{
        const isActive=step.id===currentStep;
        const isPast=step.id<currentStep;
        const isPrevious= index===STEPS_DATA.length-1; //to remove line after last element
        return(
            <div key={step.id}>

            </div>
        )

    })}
   </div>
  )
}

export default Stepper
