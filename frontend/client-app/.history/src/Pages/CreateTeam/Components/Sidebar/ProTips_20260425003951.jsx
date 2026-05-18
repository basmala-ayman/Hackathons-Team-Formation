import styles from './ProTips.module.css'
import { StarIcon , CheckIcon } from "../../../../assets/Icons";
function ProTips() {

    const tipsData = [
  "Choose a team name that’s memorable and represents your project",
  "Diverse skills lead to stronger teams - mix technical and creative talents",
  "Clear project descriptions attract the right team members",
  "Start with 3-4 members for optimal collaboration"
];
  return (
    <div className={styles.wrapper}>
        <div className="d-flex align-items-center">
            <span><StarIcon/></span>
            <h5>Pro Tips</h5>
        </div>
       <div className={styles.tips}>
        {tipsData.map((tip , index)=>(
            <div key={index} className={styles.tipRow}>
                <span>Check</span>


            </div>

        ))}


       </div>
      
    </div>
  )
}

export default ProTips
