import styles from './HackathonCard.module.css'
import CustomButton from '../../../../shared/CustomButton/CustomButton'
function HackathonCard({hackathon}) {
    const {title , prizeAmount ,image , date , teamSize , level } = hackathon
  return (
    <div className={`${styles.hackathonCard} d-flex flex-column rounded-5 `}>
        <div className={`${styles.hackathonImg}`}>{image} </div>
        <p>{title}</p>
        <div className={`${styles.hackathonDetails}`}>
            <p>{date}</p>
            <p>{prizeAmount}</p>
            <p>{teamSize}</p>
            <p>{level}</p>
        </div>
        <div className='d-flex g-2'>
<CustomButton></CustomButton>
        </div>
      
    </div>
  )
}

export default HackathonCard
