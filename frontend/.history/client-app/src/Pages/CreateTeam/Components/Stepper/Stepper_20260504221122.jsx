import styles from './Stepper.module.css'
import {TeamIcon , CheckIcon , AddMemberIcon} from '../../../../assets/Icons'
function Stepper({currentStep=4}) {

    const STEPS_DATA = [
  { id: 1, label: "Team Basics", icon:TeamIcon },
  { id: 2, label: "Add Members", icon: AddMemberIcon },
  { id: 3, label: "Required Skills", icon: CheckIcon },
  { id: 4, label: "Final Details", icon:  CheckIcon},
];
  return (
   <div className={styles.stepperContainer}>
    {STEPS_DATA.map((step)=>{
        const isActive=step.id===currentStep;
        const IconComponent = step.icon;
        return(
            <div key={step.id} className={styles.stepWrapper}>
                <div className={`${styles.circle} ${isActive? styles.activeCircle:styles.inActiveCircle}`}>
                   <IconComponent 
                    color={isActive ? "#FFFFFF" : "var("} 
                    size={24}
                    isActive={isActive} 
                />
                </div>
                <span className={`${styles.label} ${isActive? styles.activeLabel:styles.inActiveLabel}`}>
                {step.label}
                </span>

             

            </div>
        )

    })}
   </div>
  )
}

export default Stepper
