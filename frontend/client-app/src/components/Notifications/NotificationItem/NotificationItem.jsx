import React from "react";
import styles from "./NotificationItem.module.css";
import { Zap, Check, X, Eye, Clock, Users, Bell, Info } from "lucide-react";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { getNotificationNavigation } from "../../../utils/notificationNavigation";
import { useNotifications } from "../../../context/NotificationContext";
import {
  acceptInvitationFromNotification,
  rejectInvitationFromNotification,
} from "../../../services/recommendationService";

export default function NotificationItem({ data, onRead, onRemove }) {
  const metadata = data.metadata || {};
  const navigate = useNavigate();
  const { markOneAsReadLocally } = useNotifications();

  const ICON_MAP = {
    JOIN_REQUEST: <Users size={20} />,
    TEAM_INVITE: <Users size={20} />,
    TEAM_READY: <Zap size={20} />,
    MATCH_FOUND: <Zap size={20} />,
    RECOMMENDATION_RECEIVED: <Zap size={20} />,
    ROUND2_AVAILABLE: <Info size={20} />,
    HACKATHON_REMINDER: <Bell size={20} />,
    SYSTEM: <Bell size={20} />
  };


const handleAccept = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    await acceptInvitationFromNotification(metadata.invitationId);

    if (data.isUnread) {
      markOneAsReadLocally();
    }

    onRemove?.();
  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    await rejectInvitationFromNotification(metadata.invitationId);

    if (data.isUnread) {
      markOneAsReadLocally();
    }

    onRemove?.();
  } catch (error) {
    console.error(error);
  }
};

  const handleSeeInvitation = async (e) => {
    e.stopPropagation();

    try {
      await onRead?.();

      navigate("/recommended-Teams", {
        state: {
          initialTab: "invitations",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log("Notification:", data);
  console.log("Metadata:", metadata);
  console.log("InvitationId:", metadata.invitationId);

  const handleNotificationClick = async () => {
      console.log("CARD CLICKED");
    try {
      await onRead?.();
      const destination = getNotificationNavigation(data);
      if (!destination) return;
      navigate(destination.path, {
        state: destination.state,
      });
    } catch (error) {
      console.error("Failed to handle notification click", error);
    }
  };


  return (
    <div
      className={`${styles.card} ${data.isUnread ? styles.unread : ""}`}
      onClick={handleNotificationClick}
    >
      <div className={styles.main}>
        <div className={styles.iconArea}>
          <div className={styles.iconCircle}>
            {ICON_MAP[data.type] || <Bell size={20} />}
          </div>
          {data.isUnread && <span className={styles.dot} />}
        </div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <div>
              <h3 className={styles.notTitle}>{data.title}</h3>
              <span className={styles.typeBadge}>
                {data.type.replace("_", " ")}
              </span>
            </div>
          </div>

          <p className={styles.message}>{data.message}</p>

          <div className={styles.meta}>
            {metadata.openSlots !== undefined && (
              <span className={styles.matchBadge}>
                {metadata.openSlots} Open Slots
              </span>
            )}

            <span className={styles.timestamp}>
              <Clock size={14} />
              {/* Show full date and time for better clarity */}
              {new Date(data.createdAt).toLocaleString([], {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </span>
          </div>

          {(data.type === "TEAM_INVITE") && (
            <div className={styles.actions}>
              <button className={styles.btnAccept} onClick={handleAccept}>
                <Check size={16} strokeWidth={3} />
                <span>Accept</span>
              </button>
              <button className={styles.btnDecline} onClick={handleReject}>
                <X size={16} strokeWidth={3} />
                <span>Reject</span>
              </button>
            </div>
          )}

          {data.type === "MATCH_FOUND" && (
            <CustomButton
              variant="primary"
              size="sm"
              className="w-100 mt-4"
              onClick={handleSeeInvitation}
            >
              See Invitation Details
            </CustomButton>
          )}

          {data.type === "RECOMMENDATION_RECEIVED" && (
            <CustomButton
              variant="primary"
              className="w-100 mt-4"
              size="sm"
              onClick={() => window.location.href = '/recommended-Teams'}
            >
              View Recommended Teams
            </CustomButton>
          )}
        </div>
      </div>
    </div >
  );
}