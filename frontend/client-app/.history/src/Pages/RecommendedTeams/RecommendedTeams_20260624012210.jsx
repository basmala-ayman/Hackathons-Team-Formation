import styles from "./RecommendedTeams.module.css";
import toast from "react-hot-toast";
import TeamCard from "./TeamCard/TeamCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/useAuth";
import useRecommendations from "./hooks/useRecommendations";
import {
  acceptRecommendation,
  rejectRecommendation,
  respondToInvitation,
} from "../../services/recommendationService";
import { LoadingState, EmptyState } from "../../shared/States";

function RecommendedTeams() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log(user);
  //states
  // 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState("owned");
  const { recommendations, loading, error } = useRecommendations();
  const [loadingId, setLoadingId] = useState(null); //to disable more than one click on acceptance/rejection for a recommendation

  const displayedTeams =
    activeTab === "owned" ? recommendations.myTeams : recommendations.join;

  console.log("displayed teams", displayedTeams);

  //accept logic
  const handleAccept = async ({ isOwner, recommendationId, invitationId }) => {
    if (loadingId === recommendationId) return;

    try {
      setLoadingId(recommendationId);

      if (isOwner) {
        await acceptRecommendation(recommendationId);
      } else {
        await respondToInvitation(invitationId, "ACCEPT");
      }

      toast.success("Team accepted successfully");
      console.log("Team accepted successfully");
    } catch (error) {
      toast.error("Failed to Accept");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };
  // =========================
  // REJECT LOGIC
  // =========================

  // const handleReject = async ({
  //   isOwner,
  //   recommendationId,
  //   invitationId,
  // }) => {
  //   try {
  //     if (isOwner) {
  //       await rejectRecommendation(
  //         recommendationId
  //       );
  //     } else {
  //       await respondToInvitation(
  //         invitationId,
  //         "REJECT"
  //       );
  //     }

  //     console.log("Rejected successfully");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleViewTeam = (recommendationId) => {
    navigate(`/teams/${recommendationId}`);
  };

  if (loading) {
    return <LoadingState message="Loading recommendations..." />;
  }
  if (error) {
    return <EmptyState message="No Teams found" />;
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
            className={`px-5 py-2 fs-3 ${activeTab === "owned" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("owned")}
          >
            My Teams
          </button>

          <button
            type="button"
            className={`px-5 py-2 fs-3 ${activeTab === "suggested" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("suggested")}
          >
            Invitations
          </button>
        </div>
        {displayedTeams.length > 0 ? (
          displayedTeams.map((team) => {
            const isOwner = team.ownerId === user?.id;

            return (
              <TeamCard
                key={team.teamId}
                teamName={team.teamName}
                hackathonName={team.hackathonName}
                description={team.description}
                members={team.currentMembers}
                maxMembers={team.maxMembers}
                isLoading={false}
                onView={() => handleViewTeam(team.teamId)}
              />
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-2">
            No teams found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedTeams;
