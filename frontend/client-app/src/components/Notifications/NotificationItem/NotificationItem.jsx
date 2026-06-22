import React from "react";
import styles from "./NotificationItem.module.css";
import { Zap, Check, X, Eye, Clock, Users, Bell, Info } from "lucide-react";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function NotificationItem({ data, onRead }) {
  const metadata = data.metadata || {};

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

  return (
    <div
      className={`${styles.card} ${data.isUnread ? styles.unread : ""}`}
      onClick={onRead}
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
            <div className={styles.titleGroup}>
              <h3 className={styles.notTitle}>{data.title}</h3>
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

          {/* Action buttons for specific types */}
          {data.type === "JOIN_REQUEST" && (
            <div className={styles.actions}>
              <button className={styles.btnAccept} onClick={(e) => e.stopPropagation()}>
                <Check size={16} strokeWidth={3} />
                <span>Accept</span>
              </button>
              <button className={styles.btnDecline} onClick={(e) => e.stopPropagation()}>
                <X size={16} strokeWidth={3} />
                <span>Decline</span>
              </button>
            </div>
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
    </div>
  );
}