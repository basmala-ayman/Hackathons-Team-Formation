import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import defaultHackathonImg from '../../../../assets/defaultHackathonImg.png'
import {
  PrizeIcon,
  CalenderIcon,
  LocationIcon,
  LevelIcon
} from "../../../../assets/Icons";
function HackathonCard({ hackathon }) {
  const maxCapacity=30;
  const { title, prizeAmount, status ,interestCount=0, userCreated = false, } = hackathon;
  const navigate = useNavigate();

  const progressPercentage = Math.min((interestCount / maxCapacity) * 100, 100);
 
  return (
    <div
      className={`${styles.hackathonCard} d-flex flex-column  rounded-4 p-3 `}
    >
      {/* Header: Publisher Info & Badge */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        {/* <div className="d-flex align-items-center gap-2">
          <div className={styles.publisherAvatar}>
            <img src={defaultHackathonImg} alt="publisher" />
          </div>
          <div className="d-flex flex-column">
            <span className={styles.publishedByText}>Published By</span>
            <span className={styles.publisherName}>{userCreated ? "User" : publisherName}</span>
          </div>
        </div> */}
        
        {/* Dynamic Badge */}
        <div className={`${styles.badge} ${userCreated ? styles.userCreatedBadge : styles.officialBadge}`}>
          {userCreated ? "USER CREATED" : "OFFICIAL"}
        </div>


      <div className={`${styles.hackathonImg} text-center mt-5 mb-3`}>
        <img src={defaultHackathonImg} alt={title} className="w-100 rounded-top" />
      </div>

      <h4 className="fw-semibold mt-3 mb-3 fs-2">{title}</h4>

      <div className={`${styles.hackathonDetails}`}>
        {/* <div className="d-flex align-items-center gap-3 mb-2">
          <CalenderIcon></CalenderIcon>
          {date}
        </div> */}
        <div className="d-flex align-items-center gap-3 mb-2">
          <PrizeIcon color="var(--color-primary-dark)"></PrizeIcon>{" "}
          {prizeAmount}
        </div>
        {/* <div className="d-flex align-items-center gap-3 mb-2">
          <LocationIcon></LocationIcon>
          {location}
        </div> */}
        {/* <div className="d-inline-flex align-items-center p-1 fs-3 fw-bold gap-3 mb-5 rounded-4 " style={{ backgroundColor: "#F0F1F4" , color:"var(--color-primary-dark)"}}>
          <LevelIcon></LevelIcon>
          {level}</div> */}
      </div>


      <div className="d-flex gap-2 mt-auto">
        <CustomButton
          variant="primary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/")}
        >
          Create a team
        </CustomButton>
        <CustomButton
          variant="secondary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/")}
        >
          View Details
        </CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
