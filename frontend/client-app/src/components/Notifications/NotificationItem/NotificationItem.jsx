import React from "react";
import styles from "./NotificationItem.module.css";
import { Zap, Calendar, MapPin, MoreVertical } from "lucide-react";
import CustomButton from "../../../shared/CustomButton/CustomButton";

export default function NotificationItem({ data, onRead }) {
  return (
    <div
      className={`${styles.card} ${data.isunread ? styles.unread : ""}`}
      onClick={onRead} //Logic is prepared for marking as read when clicked, but currently not implemented in the parent component
    >
      <div className={styles.main}>
        {/* Column 1: Icon */}
        <div className={styles.iconArea}>
          <div className={styles.iconCircle}>
            <Zap size={20} fill="currentColor" />
          </div>
          {data.isUnread && <span className={styles.dot} />}
        </div>

        {/* Column 2: Text + Buttons */}
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

            <div className={styles.meta}>{/* ... metadata spans ... */}</div>

            {/* ACTION AREA IS NOW INSIDE CONTENT */}
            {data.type === "JOIN_REQUEST" && (
              <div className={styles.actions}>
                <button className={styles.btnAccept}>Accept</button>
                <button className={styles.btnDecline}>Decline</button>
                <button className={styles.btnLink}>View Profile</button>
              </div>
            )}

            {data.type === "TEAM_READY" && (
              <CustomButton type="submit" variant="primary" className="w-100">
                Recommended Teams
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
