import styles from "./TeamProfile.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TeamIcon, CrownIcon } from "../../../assets/Icons";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import useRecommendationDetails from "../hooks/useRecommendationDetails";

function TeamProfile() {
  const { id } = useParams();
  const { teamData, loading, error } = useRecommendationDetails(id);
  const navigate = useNavigate();
  const currentUserId = "user-123";

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ minHeight: "40vh" }}
      >
        <p
          className="fs-3 fw-semibold"
          style={{ color: "var(--color-primary-dark)" }}
        >
          Loading recommendations...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ minHeight: "40vh" }}
      >
        <p className="fs-3 fw-semibold text-secondary">No Teams found</p>
      </div>
    );
  }
  if (!teamData) {
    return (
      <div className="container py-5 text-center fs-3">Team not found!</div>
    );
  }

  const isOwner = teamData.ownerId === currentUserId;

  // Custom Dynamic Text Options
  const acceptLabel = isOwner
    ? "Accept Recommended Members"
    : "Accept to Join Team";
  const declineLabel = isOwner
    ? "Dismiss Recommendations"
    : "Decline Suggestion";

  const handleAccept = () => {
    //ADD ACCEPTANCE LOGIC
  };

  const handleDecline = () => {
    //ADD REJECTION LOGIC
  };

  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
      <div className="container py-5">
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb" className="mt-4 mb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                to="/recommendedTeams"
                className={`text-decoration-none ${styles.breadcrumbLink}`}
              >
                Recommended Teams
              </Link>
            </li>
            <li
              className={`breadcrumb-item active ${styles.breadcrumbActive}`}
              aria-current="page"
            >
              Team Profile
            </li>
          </ol>
        </nav>

        {/* Header */}
        <h1 className={`fw-bolder mb-2 ${styles.teamTitle}`}>
          {teamData.teamName || "New Team"}
        </h1>

        <p className={`mb-2 ${styles.hackathonLine}`}>
          {teamData.hackathonName}
        </p>
        <p className={`mb-5 ${styles.description}`}>{teamData.description}</p>

        <div className="d-flex align-items-center gap-2 mb-4">
          <span>
            <TeamIcon size={24} />
          </span>
          <h4 className={`fw-bold mb-0 ${styles.sectionHeader}`}>
            Team Members
          </h4>
        </div>

        <div className="row g-4 mb-4">
          {teamData.members.map((member, index) => (
            <div key={index} className="col-md-6">
              <div
                className={`p-4 d-flex align-items-center gap-4 ${styles.memberCard}`}
                //TO BE CHANGED TO CORRECT URL
                onClick={() => navigate(`/users/${member.id}`)}
                role="button" /* Tell assistive screen readers this is interactive */
                tabIndex={0} /* Allow keyboard accessibility navigating */
              >
                <div className={styles.avatarWrapper}>
                  <img
                    src={member.avatar || defaultProfile}
                    alt={member.name}
                    className={styles.memberAvatar}
                  />
                  {member.role === "Team Leader" && (
                    <span className={styles.leaderCrown} title="Team Leader">
                      <CrownIcon></CrownIcon>
                    </span>
                  )}
                </div>
                <div>
                  <h5 className={`fw-bold mb-1 ${styles.memberName}`}>
                    {member.name}
                  </h5>
                  <p className={`mb-3 ${styles.memberRole}`}>{member.role}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {member.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.skillTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.progressSection}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={styles.progressLabel}>Team Progress</span>
            <span className={`fw-bold ${styles.progressValue}`}>
              {teamData.members.length}/{teamData.maxMembers} Members
            </span>
          </div>
          <div className={styles.progressTrackLine}>
            <div
              className={styles.progressFillLine}
              style={{
                width: `${(teamData.members.length / teamData.maxMembers) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex gap-3 justify-content-end mt-5 flex-wrap">
          <CustomButton
            variant="secondary"
            size="sm"
            className={` fw-semibold ${styles.btnDecline}`}
            onClick={handleDecline}
          >
            {declineLabel}
          </CustomButton>

          <CustomButton
            variant="primary"
            size="sm"
            className={`fw-semibold text-white ${styles.btnAccept}`}
            onClick={handleAccept}
          >
            {acceptLabel}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default TeamProfile;
