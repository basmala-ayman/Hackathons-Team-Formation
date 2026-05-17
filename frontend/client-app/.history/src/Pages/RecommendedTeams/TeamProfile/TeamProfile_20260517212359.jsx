import styles from "./TeamProfile.module.css";
import { useParams, Link } from "react-router-dom";
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
]};
function TeamProfile() {
  const { id } = useParams();
  const teamData = allTeamsDatabase.find((team) => team.id === id);

  const currentUserId = "user-123"; //will be fetched
  const isOwner = teamData.ownerId === currentUserId;

  // 3. SET DYNAMIC BUTTON LABELS AND ACTIONS
  const buttonLabel = isOwner
    ? "Accept Recommended Members"
    : "Request to Join Team";

  const handleActionClick = () => {
    if (isOwner) {
      // Future API
    } else {
      // Future API
    }
  };

  if (!teamData) {
    return (
      <div className="container py-5 text-center fs-2">
        <h4>Team not found!</h4>
      </div>
    );
  }

  {
    return (
      <div className="container py-4">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/recommendedTeams">Recommended Teams</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Team Profile
            </li>
          </ol>
        </nav>

        {/* Team Info Header */}
        <h2 className="fw-bold color-purple">{teamData.teamName}</h2>
        <p className="text-muted mb-4">{teamData.hackathonName}</p>

        {teamData.description && (
          <p className="fs-5 mb-5 text-secondary">{teamData.description}</p>
        )}

        {/* Members Grid Layout */}
        <h5 className="fw-bold mb-4 color-purple">👥 Team Members</h5>
       {/* Render the grid containing member profiles AND the action button */}
<div className="row g-4">
  {teamData.members.map((member, index) => (
    <div key={index} className="col-md-6">
      <div className={`p-4 d-flex align-items-center gap-3 ${styles.memberCard}`}>
        <div className={styles.avatarWrapper}>
          <img src={member.avatar} alt={member.name} className={styles.memberAvatar} />
          {/* Render yellow crown/badge if member is Leader */}
          {member.role === "Team Leader" && (
            <span className={styles.leaderCrown} title="Team Leader">⭐</span>
          )}
        </div>
        <div>
          <h6 className={`fw-bold mb-0 ${styles.memberName}`}>{member.name}</h6>
          <small className={`d-block mb-2 ${styles.memberRole}`}>{member.role}</small>
          <div className="d-flex gap-2 flex-wrap">
            {member.tags.map((tag, tIdx) => (
              <span key={tIdx} className={styles.skillTag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* THE ACTION BUTTON SITS AS THE FINAL CARD IN THE SAME ROW GRID LOOP */}
  <div className="col-md-6">
    <CustomButton 
      variant="primary" 
      className={`w-100 py-4 fw-medium ${styles.btnInviteGrid}`}
      onClick={handleActionClick}
    >
      <HiOutlineBell size={20} className="me-2" />
      {buttonLabel}
    </CustomButton>
  </div>
</div>

{/* --- FULL WIDTH PROGRESS FOOTER UNDERNEATH --- */}
<div className={styles.progressSection}>
  <div className="d-flex justify-content-between align-items-center mb-2 small">
    <span className={styles.progressLabel}>Team Progress</span>
    <span className={`fw-bold ${styles.progressValue}`}>
      {teamData.members.length}/{teamData.maxMembers} Members
    </span>
  </div>
  <div className={styles.progressTrackLine}>
    <div 
      className={styles.progressFillLine} 
      style={{ width: `${(teamData.members.length / teamData.maxMembers) * 100}%` }}
    ></div>
  </div>
</div>
</div>
}}

export default TeamProfile;
