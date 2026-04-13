import React from "react";
import styles from "./NotificationList.module.css";
import NotificationItem from "../NotificationItem/NotificationItem";

// MOCK_DATA represents what the backend GET /notifications should return
const MOCK_DATA = [
  {
    id: "n1",
    type: "TEAM_READY",
    title: "Your AI Teams are Ready",
    message:
      "3 potential matches found for Tech Titans in AI for Climate Action",
    isUnread: true,
    isHighPriority: true,
    timestamp: "Just now",
    metadata: { team: "Tech Titans", hackathon: "InnovateX" },
  },
  {
    id: "n2",
    type: "JOIN_REQUEST",
    title: "New Team Join Request",
    message:
      "Alex Martinez wants to join AI Innovators for AI Innovation Summit",
    isUnread: true,
    isHighPriority: true,
    timestamp: "5 min ago",
    metadata: { match: 96, location: "San Francisco, CA", avatar: null },
  },
];

export default function NotificationList({ filter }) {
  const handleMarkAsRead = (id) => {
    console.log(`Triggering markAsRead API for ID: ${id}`);
    // I will call service.markAsRead(id) here
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div className={styles.titleInfo}>
          <h2>All Notifications</h2>
          <span className={styles.badge}>3 unread</span>
        </div>
        <button className={styles.markAllBtn}>Mark all as read</button>
      </div>
      <div className={styles.itemsStack}>
        {MOCK_DATA.map((item) => (
          <NotificationItem
            key={item.id}
            data={item}
            onRead={() => handleMarkAsRead(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
