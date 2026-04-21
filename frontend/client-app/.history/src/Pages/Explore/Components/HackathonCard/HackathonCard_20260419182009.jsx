import styles from './HackathonCard.module.css'
function HackathonCard({hackathon}) {
    const {title , prizeAmount ,image , date , teamSize , level } = hackathon
  return (
    <div className={`${styles.hackathonCard} dis `}>
      
    </div>
  )
}

export default HackathonCard
