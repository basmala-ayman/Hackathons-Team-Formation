import React from "react";
import styles from "./NotificationItem.module.css";
import {
  Zap,
  MapPin,
  MoreVertical,
  Check,
  X,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function NotificationItem({ data, onRead }) {
  const { metadata } = data;

  return (
    <div
      className={`${styles.card} ${data.isUnread ? styles.unread : ""}`}
      onClick={onRead}
    >
      <div className={styles.main}>
        <div className={styles.iconArea}>
          <div className={styles.iconCircle}>
            <Zap size={20} fill="currentColor" />
          </div>
          {data.isUnread && <span className={styles.dot} />}
        </div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <div className={styles.titleGroup}>
              <div className={styles.notTitle}>
                <h3>{data.title}</h3>
              </div>
              {data.isHighPriority && (
                <span className={styles.highPriority}>High Priority</span>
              )}
            </div>

            <p className={styles.message}>{data.message}</p>

            <div className={styles.meta}>
              {metadata.team && (
                <span className={styles.metaItem}>
                  <Zap size={14} /> {metadata.team}
                </span>
              )}

              {metadata.match && (
                <span className={styles.matchBadge}>
                  {metadata.match}% Match
                </span>
              )}

              {metadata.location && (
                <span className={styles.metaItem}>
                  <MapPin size={14} /> {metadata.location}
                </span>
              )}

              <span className={styles.timestamp}>
                <Clock size={14} /> {data.timestamp}
              </span>
            </div>

            {data.type === "JOIN_REQUEST" && (
              <div className={styles.actions}>
                <button className={styles.btnAccept} >
                  <Check size={16} strokeWidth={3} />
                  <span>Accept</span>
                </button>
                <button className={styles.btnDecline}>
                  <X size={16} strokeWidth={3} />
                  <span>Decline</span>
                </button>
                <button className={styles.btnLink}>
                  <Eye size={16} strokeWidth={2} />
                  <span>View Profile</span>
                </button>
              </div>
            )}

            {data.type === "TEAM_READY" && (
              <CustomButton
                type="submit"
                variant="primary"
                className="w-100 mt-2"
              >
                Recommended Teams
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
