import styles from "./RecommendedTeams.module.css";
import TeamCard from "./TeamCard/TeamCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/useAuth";
import useRecommendations from "./hooks/useRecommendations";

function RecommendedTeams() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user)
  const { recommendations, loading, error } = useRecommendations("all");

  //states
  //'all' | 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState("all");

  //filter based on chosen tab
  const filteredTeams = recommendations.filter((team) => {
    if (activeTab === "owned") {
      return team.ownerId === user?.id;
    }
    if (activeTab === "suggested") {
      return team.ownerId !== currentUserId;
    }
    return true; //return all teams
  });

  const handleAcceptTeam = (isOwner) => {
    //will be implemented later
  };

  const handleViewTeam = (teamId) => {
    navigate(`/teams/${teamId}`);
  };
  if (loading) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center w-100" 
        style={{ minHeight: "40vh" }}
      >
        <p className="fs-3 fw-semibold" style={{ color: "var(--color-primary-dark)" }}>
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
        <p className="fs-3 fw-semibold text-secondary">
          No Teams found
        </p>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
      <div className={`container py-5`}>
        <h3
          className="fw-bolder"
          style={{
            color: "var(--color-very-dark-purple)",
            fontSize: "var(--fs-h3)",
          }}
        >
          Recommended Teams
        </h3>
        <p
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--fs-regular)",
          }}
        >
          Find the perfect team to join and collaborate on exciting hackathon
          projects
        </p>

        <div className="d-flex gap-3 my-5 flex-wrap">
          <button
            type="button"
            className={`px-5 py-2 fs-3 ${activeTab === "all" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("all")}
          >
            All Recommendations
          </button>

          <button
            type="button"
            className={`px-5 py-2 fs-3 ${activeTab === "owned" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("owned")}
          >
            My Created Teams
          </button>

          <button
            type="button"
            className={`px-5 py-2 fs-3 ${activeTab === "suggested" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("suggested")}
          >
            Suggested to Join
          </button>
        </div>

        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => {
            const isOwner = team.ownerId === currentUserId;
            const buttonLabel = isOwner
              ? "Accept Recommended Members"
              : "Accept to Join Team";

            return (
              <TeamCard
                key={team.teamId}
                teamName={team.teamName}
                hackathonName={team.hackathonName}
                description={team.description}
                members={team.currentMembers}
                maxMembers={team.maxMembers}
                acceptLabel={buttonLabel}
                onAccept={() => handleAcceptTeam(isOwner)}
                onView={() => handleViewTeam(team.teamId)}
              />
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-4">
            No recommended teams match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedTeams;
