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

function RecommendedTeams() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  //states
  //'all' | 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState("all");
  const { recommendations, loading, error } = useRecommendations();
  const [loadingId, setLoadingId] = useState(null); //to disable more than one click on acceptance/rejection for a recommendation

  const displayedTeams =
    activeTab === "owned"
      ? recommendations.myTeams
      : activeTab === "suggested"
        ? recommendations.join
        : [...recommendations.myTeams, ...recommendations.join];

  console.log(displayedTeams);

  //accept logic
  const handleAccept = async ({ isOwner, recommendationId, invitationId }) => {
      if (loadingId === recommendationId) return;

    try {
          setLoadingId(recommendationId);

      if (isOwner) {
        toast.success("Accepted successfully 🎉");
      } else {
        await respondToInvitation(invitationId, "ACCEPT");
      }
      
      await acceptRecommendation(recommendationId);
      console.log("Accepted successfully");
    } catch (error) {
      console.error(error);
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

        {displayedTeams.length > 0 ? (
          displayedTeams.map((team) => {
            const isOwner = team.ownerId === user?.id;
            return (
              <div key={team.teamId}>
                {team.recommendations?.map((recommendation) => {
                  // find current user invitation
                  const currentInvitation = recommendation.members?.find(
                    (member) => member.userId === user?.id,
                  );

                  const invitationId = currentInvitation?.invitationId;

                  const buttonLabel = isOwner
                    ? "Accept Recommended Members"
                    : "Accept to Join Team";

                  return (
                    <TeamCard
                      key={recommendation.id}
                      teamName={team.teamName}
                      hackathonName={team.hackathonName}
                      description={team.description}
                      members={recommendation.members}
                      maxMembers={team.maxMembers}
                      acceptLabel={buttonLabel}
                      onAccept={() =>
                        handleAccept({
                          isOwner,
                          recommendationId: recommendation.id,
                          invitationId,
                        })
                      }
                      // onReject={() =>
                      //   handleReject({
                      //     isOwner,
                      //     recommendationId:
                      //       recommendation.id,
                      //     invitationId,
                      //   })
                      // }
                      onView={() => handleViewTeam(recommendation.id)}
                    />
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-2">
            No recommended teams match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedTeams;
