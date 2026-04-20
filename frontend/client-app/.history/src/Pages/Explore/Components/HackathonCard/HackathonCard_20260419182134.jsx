import styles from './HackathonCard.module.css'
function HackathonCard({hackathon}) {
    const {title , prizeAmount ,image , date , teamSize , level } = hackathon
  return (
    <div className={`${styles.hackathonCard} d-flex flex-column rounded-5 `}>
        <div className={`${hackathon}`}'></div>
      
    </div>
  )
}

export default HackathonCard
