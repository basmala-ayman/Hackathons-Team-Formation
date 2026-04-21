import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
function HackathonCard({ hackathon }) {
  const { title, prizeAmount, image, date, teamSize, level } = hackathon;
  return (
    <div className={`${styles.hackathonCard} d-flex flex-column  rounded-2 `}>
      <div className={`${styles.hackathonImg} text-center mb-3`}>
        <img src={image} alt={title} className="img-fluid" />
      </div>
      <h4 className="fw-bold mt-3 mb-3">{title}</h4>
      <div className={`${styles.hackathonDetails}`}>
        <p>{date}</p>
        <p>{prizeAmount}</p>
        <p>{teamSize}</p>
        <p>{level}</p>
      </div>
      <div className="d-flex gap-2">
        <CustomButton variant="primary">Create a team</CustomButton>
        <CustomButton variant="secondary">View Details</CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
