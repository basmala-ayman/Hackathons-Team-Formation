import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
function HackathonCard({ hackathon }) {
  const { title, prizeAmount, image, date, teamSize, level } = hackathon;
const navigate=useNavigate(); 
  return (
    <div className={`${styles.hackathonCard} d-flex flex-column  rounded-2 `}>
      <div className={`${styles.hackathonImg} text-center mb-3`}>
        <img src={image} alt={title} className="w-100 rounded-top" />
      </div>
      <h4 className="fw-bold mt-3 mb-3">{title}</h4>
      <div className={`${styles.hackathonDetails}`}>
        <p>{date}</p>
        <p>{prizeAmount}</p>
        <p>{teamSize}</p>
        <p>{level}</p>
      </div>
      <div className="d-flex w-100 gap-2">
        <CustomButton variant="primary" size="sm" className="flex-fill rounded-4" onClick={()=>navigate("/login")}>Create a team</CustomButton>
        <CustomButton variant="secondary" size="sm" className="flex-fill rounded-4" >View Details</CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
