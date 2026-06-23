import React, { useState, useEffect, useMemo } from "react";
import styles from "./NotificationList.module.css";
import NotificationItem from "../NotificationItem/NotificationItem";
import { BellOff } from "lucide-react";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../../../services/notificationService";

export default function NotificationList({ filter }) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const FILTER_CATEGORIES = [
    { id: "all", label: "All", types: [] },
    { id: "team", label: "Team Requests", types: ["TEAM_INVITE"] }, { id: "accepted", label: "Accepted", types: ["INVITE_ACCEPTED"] },
    { id: "declined", label: "Declined", types: ["INVITE_REJECTED"] }, // إضافة هذا السطر
    { id: "matches", label: "Matches", types: ["MATCH_FOUND", "RECOMMENDATION_RECEIVED", "ROUND2_AVAILABLE"] },
  ];

  const filteredNotifications = useMemo(() => {
    const category = FILTER_CATEGORIES.find(c => c.id === filter);
    if (!category || category.id === "all") return allNotifications;
    return allNotifications.filter(n => category.types.includes(n.type));
  }, [allNotifications, filter]);

  useEffect(() => {
    setLoading(true);
    getMyNotifications(1, 20)
      .then((res) => setAllNotifications(res.notifications || []))
      .catch((err) => console.error("Error fetching:", err))
      .finally(() => setLoading(false));
  }, []);

  console.log(allNotifications)

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setAllNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  if (loading) return (
    <div
      className="text-center mt-4"
      style={{
        color: "var(--color-primary-dark)",
        padding: "40px",
        fontSize: "var(--fs-regular)",
        fontWeight: "600"
      }}
    >
      Loading notifications...
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div className={styles.titleInfo}>
          <h2>{FILTER_CATEGORIES.find(c => c.id === filter)?.label || "Notifications"}</h2>
          <span className={styles.badge}>
            {filteredNotifications.filter(n => !n.isRead).length} unread
          </span>
        </div>
        <button className={styles.markAllBtn} onClick={handleMarkAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className={styles.itemsStack}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <NotificationItem
              key={item.id}
              data={{ ...item, isUnread: !item.isRead }}
              onRead={() => handleMarkAsRead(item.id)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <BellOff size={48} />
            </div>
            <h3>No notifications yet</h3>
            <p>When you have new updates, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}