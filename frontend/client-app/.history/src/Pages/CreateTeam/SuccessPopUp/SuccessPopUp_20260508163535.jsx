import styles from "./SuccessPopUp.module.css";
import { SparkleIcon } from "../../../assets/Icons";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useNavigate , useState} from "react-router-dom";
function SuccessPopUp({ teamName, onClose }) {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
   setIsExiting(true); //make the navigation smooth

    // wait 4s before navigating (wait for css transitions)
    setTimeout(() => {
      onClose(); 
      navigate('/');
      
      // Ensure home page starts at the very top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400); 
  };
  return (
    <>
      <div className="modal-backdrop fade show ${isExiting ? styles.fadeOut : ''}`}" style={{ zIndex: 1050 }}></div>

      <div
        className="modal d-block fade show ${isExiting ? styles.modalExit : ''}"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg gap-2">
          <div className={`modal-content border-0 p-5 ${styles.roundedModal}`}>
            {/* Close Button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-4"
              onClick={onClose}
              aria-label="Close"
            ></button>

            <div className="modal-body text-center">
              <div className={`${styles.mainIcon} mx-auto mb-4`}>
                <SparkleIcon color="#fff" size={40} />
              </div>

              <h2 className={`fw-bolder mb-2 ${styles.title}`}>Stay Tuned!</h2>
              <p className="text-secondary mb-0 fs-3">
                We’re building your team
                <span className={styles.teamName}>"{teamName || ""}"</span>
                now! Hang tight
              </p>

              <div className={`my-4 p-4 ${styles.aiCard}`}>
                <div className="d-flex align-items-center justify-content-center gap-3 mb-2 fw-bold text-dark">
                  <div className={styles.miniIcon}>
                    <SparkleIcon color="#fff" size={20} />
                  </div>
                  AI is Matching Your Team
                </div>
                <p className="small text-muted mb-4">
                  Our intelligent system is finding the perfect teammates based
                  on your skills, interests, and project requirments.
                </p>
                <div
                  className={`progress ${styles.progressTrack}`}
                  style={{ height: "8px" }}
                >
                  <div
                    className={`progress-bar ${styles.progressFill}`}
                    role="progressbar"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-2 mb-4 text-secondary fs-3">
                <SparkleIcon
                  className="text-success"
                  size={10}
                  color="var(--color-success-green)"
                />
                You'll receive a notification when matches are ready
              </div>

              <CustomButton
                variant="primary"
                className="w-100 py-3"
                onClick={handleNavigate}
              >
                Got It
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPopUp;
