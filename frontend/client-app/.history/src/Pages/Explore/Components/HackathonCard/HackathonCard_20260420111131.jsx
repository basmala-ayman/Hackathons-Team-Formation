import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  PrizeIcon,
  CalenderIcon,
  LocationIcon,
} from "../../../../assets/Icons";
function HackathonCard({ hackathon }) {
  const { title, prizeAmount, image, date, location, level } = hackathon;
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.hackathonCard} d-flex flex-column  rounded-4 p-3 `}
    >
      <div className={`${styles.hackathonImg} text-center mt-5 mb-3`}>
        <img src={image} alt={title} className="w-100 rounded-top" />
      </div>
      <h4 className="fw-semibold mt-3 mb-3 fs-2">{title}</h4>
      <div className={`${styles.hackathonDetails}`}>
        <div className="d-flex align-items-center">
          <CalenderIcon></CalenderIcon>
          {date}
        </div>
        <p>
          {" "}
          <PrizeIcon color="var(--color-primary-dark)"></PrizeIcon>{" "}
          {prizeAmount}
        </p>
        <p>
          <LocationIcon></LocationIcon>
          {location}
        </p>
        <p>{level}</p>
      </div>
      <div className="d-flex w-100 gap-2 mt-auto">
        <CustomButton
          variant="primary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/login")}
        >
          Create a team
        </CustomButton>
        <CustomButton
          variant="secondary"
          size="sm"
          className="flex-fill rounded-4"
        >
          View Details
        </CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
