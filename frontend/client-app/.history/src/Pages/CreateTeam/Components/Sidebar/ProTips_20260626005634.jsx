import styles from './ProTips.module.css'
import { SparkleIcon , CheckIcon } from "../../../../assets/Icons";
function ProTips() {

    const tipsData = [
  "Choose a team name that’s memorable and represents your project",
  "Team size only includes the teammates you're looking for, not yourself.",
  "Diverse skills lead to stronger teams - mix technical and creative talents",
  "Clear project descriptions attract the right team members",
];
  return (
    <div >
    <div className={styles.wrapper}>
        <div className="d-flex align-items-center gap-2 mb-4">
            <span ><SparkleIcon size={20}/></span>
            <h5 className='fw-bold fs-4 mb-0'>Pro Tips</h5>
        </div>
       <div className="d-flex flex-column gap-2">
        {tipsData.map((tip , index)=>(
            <div key={index} className={`d-flex gap-2 align-items-start p-3 ${styles.tipRow}`}>
                <span><CheckIcon/></span>
                <p className='mb-0'>{tip}</p>


            </div>

        ))}

</div>
       </div>
      
    </div>
  )
}

export default ProTips
