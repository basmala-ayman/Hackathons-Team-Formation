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
import {
  LoadingState,
  EmptyState
} from "../../shared/States"

function RecommendedTeams() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log(user);
  //states
  //'all' | 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState("all");
  const { recommendations, loading, error } = useRecommendations();
  const [loadingId, setLoadingId] = useState(null); //to disable more than one click on acceptance/rejection for a recommendation

  // Deduplicate join items by team id
  const dedupedJoin = (recommendations?.join || []).reduce((acc, invitation) => {
    const existing = acc.find((item) => item.team.id === invitation.team.id);
    if (!existing) {
      acc.push(invitation);
    } else {
      // Keep the one with the later deadline
      if (new Date(invitation.deadline) > new Date(existing.deadline)) {
        const index = acc.indexOf(existing);
        acc[index] = invitation;
      }
    }
    return acc;
  }, []);

  // const displayedTeams =
  //   activeTab === "owned"
  //     ? (recommendations?.myTeams || [])
  //     : activeTab === "suggested"
  //       ? dedupedJoin
  //       : [
  //         ...(recommendations?.myTeams || []),
  //         ...dedupedJoin
  //       ];
  const displayedTeams =
    activeTab === "owned"
      ? (recommendations?.myTeams || [])
      : activeTab === "suggested"
        ? dedu [
          ...(recommendations?.myTeams || []),
          ...dedupedJoin
        ];
  console.log(displayedTeams);

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
      toast.error("Failed to Accept")
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
    return (
      <LoadingState message="Loading recommendations..." />
    );
  }
  if (error) {
    return (
      <EmptyState message="No Teams found" />
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

          displayedTeams.map((item) => {

            const isJoinItem = !!item.invitationId && !!item.team && !item.teamId;
            // ================= JOIN TAB =================
            if (isJoinItem) {
              return (
                <TeamCard
                  key={item.invitationId}
                  teamName={item.team?.teamName}
                  hackathonName={item.team?.hackathonName}
                  description={item.team?.description}
                  members={item.team?.currentMembers || []}
                  maxMembers={item.team?.maxMembers || 4}
                  acceptLabel="Accept to Join Team"
                  isLoading={loadingId === item.invitationId}
                  onAccept={() =>
                    handleAccept({
                      isOwner: false,
                      recommendationId: item.invitationId,
                      invitationId: item.invitationId,
                    })
                  }
                  onView={() => handleViewTeam(item.team.id)} />
              );
            }

            // ================= MY TEAMS =================
            const isOwner = item.ownerId === user?.id;

            return (
              <div key={item.teamId}>
                {item.recommendations?.map((rec) => {
                  if (!rec) return null;

                  const currentInvitation = rec.members?.find(
                    (m) => m.userId === user?.id
                  );

                  const invitationId = currentInvitation?.invitationId;

                  return (
                    <TeamCard
                      key={`${item.teamId}-${rec.id}`}
                      teamName={item.teamName}
                      hackathonName={item.hackathonName}
                      description={item.description}
                      members={rec.members}
                      maxMembers={item.maxMembers}
                      acceptLabel={
                        isOwner
                          ? "Accept Recommended Members"
                          : "Accept to Join Team"
                      }
                      isLoading={loadingId === rec.id}
                      onAccept={() =>
                        handleAccept({
                          isOwner,
                          recommendationId: rec.id,
                          invitationId,
                        })
                      }
                      onView={() => handleViewTeam(item.teamId)}
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
