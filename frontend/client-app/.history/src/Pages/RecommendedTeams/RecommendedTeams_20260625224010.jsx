import styles from "./RecommendedTeams.module.css";
import toast from "react-hot-toast";
import TeamCard from "./TeamCard/TeamCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MyTeamsList from "./Components/MyTeamsList";
import InvitationsList from "./Components/InvitationsList";
import useRecommendations from "./hooks/useRecommendations";
import {
  acceptRecommendation,
  rejectRecommendation,
  respondToInvitation,
} from "../../services/recommendationService";
import { RaiseUpIcon } from "../../assets/Icons";
import { LoadingState, EmptyState } from "../../shared/States";

function RecommendedTeams() {
  // const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.initialTab || "myTeams";

  // 'myTeams' | 'invitations'
  const [activeTab, setActiveTab] = useState(initialTab);
  const { recommendations, loading, error, refetchRecommendations } =
    useRecommendations();
  const [acceptingId, setAcceptingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  const displayedTeams =
    activeTab === "myTeams" ? recommendations.myTeams : recommendations.join;

  const handleAccept = async ({
    isOwner,
    recommendationId,
    invitationId,
    teamName,
  }) => {
    const idToLoad = isOwner ? recommendationId : invitationId;
    if (acceptingId === idToLoad) return;

    try {
      setAcceptingId(idToLoad);

      if (isOwner) {
        await acceptRecommendation(recommendationId);
        toast.success("Team accepted and invitations are sent");
      } else {
        toast.success(
          `Congrats for joining the team and you are part of team ${teamName} now`,
        );
        await respondToInvitation(invitationId, "ACCEPT");
      }
      await refetchRecommendations();
    } catch (error) {
      toast.error("Failed to Accept");
      console.error(error);
    } finally {
      setAcceptingId(null);
    }
  };

  const handleReject = async ({ isOwner, recommendationId, invitationId }) => {
    const idToLoad = isOwner ? recommendationId : invitationId;
    if (rejectingId === idToLoad) return;

    try {
      setRejectingId(idToLoad);

      if (isOwner) {
        await rejectRecommendation(recommendationId);
      } else {
        await respondToInvitation(invitationId, "REJECT");
      }
      toast.success("Rejected successfully");
      await refetchRecommendations();
    } catch (error) {
      toast.error("Failed to Reject");
      console.error(error);
    } finally {
      setRejectingId(null);
    }
  };
  if (loading) {
    return <LoadingState message="Loading recommendations..." />;
  }

  if (error) {
    return <EmptyState message="No Recommended Teams yet" />;
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

        {/* tabs */}
        <div className="d-flex  my-5 flex-wrap">
          <button
            type="button"
            className={`px-5 py-2 fs-3 ${styles.leftTab} ${
              activeTab === "myTeams" ? styles.activeTab : styles.inactiveTab
            }`}
            onClick={() => setActiveTab("myTeams")}
          >
            My Teams
          </button>

          <button
            type="button"
            className={`px-5 py-2 fs-3 ${styles.rightTab} ${
              activeTab === "invitations"
                ? styles.activeTab
                : styles.inactiveTab
            }`}
            onClick={() => setActiveTab("invitations")}
          >
            Invitations
          </button>
        </div>

        {displayedTeams.length > 0 ?(
          activeTab === "myTeams" ? (
            <MyTeamsList 
              teams={displayedTeams} 
              acceptingId={acceptingId}
              rejectingId={rejectingId}
              onAccept={handleAccept}
              onReject={handleReject}
              styles={styles}
            />
          ) : (
            <InvitationsList 
              invitations={displayedTeams}
              acceptingId={acceptingId}
              rejectingId={rejectingId}
              onAccept={handleAccept}
              onReject={handleReject}
              styles={styles}
            />
          )
        ) : (
          <EmptyState message="No Teams found yet" />
        )}
      </div>
    </div>
  );
}
export default RecommendedTeams;
