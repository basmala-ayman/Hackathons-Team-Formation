import styles from "./SuccessPopUp.module.css";
import { SparkleIcon } from "../../../assets/Icons";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
function SuccessPopUp({ teamName, onClose }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    onClose();
    navigate("/");
  };
  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>

      <div
        className="modal d-block fade show"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content border-0 p-4 ${styles.roundedModal}`}>
            {/* Close Button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-4"
              onClick={onClose}
              aria-label="Close"
            ></button>

            <div className="modal-body text-center">
              <div className={`${styles.mainIcon} mx-auto mb-4`}>
                <SparkleIcon color="#fff" size={30} />
              </div>

              <h2 className={`fw-bolder mb-2 ${styles.title}`}>
                Stay Tuned! 
              </h2>
              <p className="text-secondary mb-0">
                Your team{" "}
                <span className={styles.teamName}>
                  "{teamName || ""}"
                </span>
                has been created successfully
              </p>

              <div className={`my-4 p-4 ${styles.aiCard}`}>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2 fw-bold text-dark">
                  <div className={styles.miniIcon}>
                    {" "}
                    <SparkleIcon color="#fff" size={15} />
                  </div>
                  AI is Matching Your Team
                </div>
                <p className="small text-muted mb-4">
                  Our intelligent system is finding the perfect teammates based
                  on your skills, interests, and project goals
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

              {/* Notification Text */}
              <div className="d-flex align-items-center justify-content-center gap-2 mb-4 text-secondary small">
                <HiOutlineBellAlert className="text-success" size={20} />
                You'll receive a notification when matches are ready
              </div>

              <CustomButton
                variant="primary"
                className="w-100 py-3"
                onClick={handleGotIt}
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
