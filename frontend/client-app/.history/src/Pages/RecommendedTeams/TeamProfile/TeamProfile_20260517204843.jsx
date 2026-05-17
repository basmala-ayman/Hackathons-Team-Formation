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
];
function TeamProfile() {
  const { id } = useParams();
  const teamData = allTeamsDatabase.find((team) => team.id === id);

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
        <div className="row g-4 mb-5">
          {teamData.members.map((member, index) => (
            <div key={index} className="col-md-6">
              <div
                className={`p-3 d-flex align-items-center gap-3 ${styles.memberCard}`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={styles.memberAvatar}
                />
                <div>
                  <h6 className="fw-bold mb-0">{member.name}</h6>
                  <small className="text-muted d-block mb-2">
                    {member.role}
                  </small>
                  <div className="d-flex gap-2">
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

        <div className="d-flex justify-content-between align-items-center border-top pt-4">
          <div>
            <small className="text-muted d-block">Team Progress</small>
            <span className="fw-bold text-purple">
              {teamData.members.length}/{teamData.maxMembers} Members
            </span>
          </div>
          <CustomButton variant="primary" className="px-5 py-3">
            Send Invitation to the members
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default TeamProfile;
