import styles from "./TeamProfile.module.css";
import { useParams, Link } from "react-router-dom";
import { TeamIcon } from "../../../assets/Icons";
import CustomButton from "../../../shared/CustomButton/CustomButton";
const allTeamsDatabase = [
  {
    id: "1",
    teamName: "EcoVision Team",
    hackathonName: "Green Tech Hackathon 2026",
    description:
      "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
    maxMembers: 4,
    ownerId: "user-123",
    members: [
      { name: "Sarah Chen", role: "Team Leader", tags: ["ML/AI", "Python"] },
      {
        name: "Mike Johnson",
        role: "Frontend Developer",
        tags: ["React", "Frontend"],
      },
      {
        name: "Lisa Park",
        role: "Backend Developer",
        tags: ["Node.js", "Backend"],
      },
    ],
  },
];
function TeamProfile() {
  const { id } = useParams();
  const currentUserId = "user-123";

  const teamData = allTeamsDatabase.find((team) => team.id === id);

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

        {/* Breadcrumb  navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                to="/recommended-teams"
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

        {/* Main Team Header row */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <h1 className={`fw-bolder mb-0 ${styles.teamTitle}`}>
            {teamData.teamName}
          </h1>
          <span className={`px-4 py-2 fw-semibold ${styles.matchBadge}`}>
            {teamData.matchLevel} Match
          </span>
        </div>

        <p className={`mb-4 ${styles.hackathonLine}`}>
          {teamData.hackathonName}
        </p>
        <p className={`mb-5 ${styles.description}`}>{teamData.description}</p>

        {/* Member Grid Section */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="fs-3">👥</span>
          <h4 className={`fw-bold mb-0 ${styles.sectionHeader}`}>
            Team Members
          </h4>
        </div>

        {/* Strictly Profiles inside this grid layout now */}
        <div className="row g-4 mb-5">
          {teamData.members.map((member, index) => (
            <div key={index} className="col-md-6">
              <div
                className={`p-4 d-flex align-items-center gap-4 ${styles.memberCard}`}
              >
                <div className={styles.avatarWrapper}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={styles.memberAvatar}
                  />
                  {member.role === "Team Leader" && (
                    <span className={styles.leaderCrown} title="Team Leader">
                      ⭐
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

        {/* --- FULL WIDTH PROGRESS TIMELINE --- */}
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

        {/* --- DYNAMIC ACTION BUTTON CONTROLS ROW (BELOW PROGRESS BAR) --- */}
        <div className="d-flex gap-3 justify-content-end mt-5 flex-wrap">
          <CustomButton
            variant="secondary"
            className={`px-4 py-3 fw-semibold ${styles.btnDecline}`}
            onClick={handleDecline}
          >
            <HiOutlineXMark size={20} className="me-2" />
            {declineLabel}
          </CustomButton>

          <CustomButton
            variant="primary"
            className={`px-5 py-3 fw-semibold text-white ${styles.btnAccept}`}
            onClick={handleAccept}
          >
            {isOwner && <HiOutlineBell size={20} className="me-2" />}
            {acceptLabel}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default TeamProfile;
