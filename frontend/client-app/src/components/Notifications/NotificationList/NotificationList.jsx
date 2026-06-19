import React, { useState, useEffect } from "react";
import styles from "./NotificationList.module.css";
import NotificationItem from "../NotificationItem/NotificationItem";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../../../services/notificationService";

export default function NotificationList({ filter }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyNotifications(1, 20)
      .then((res) => {
        setNotifications(res.data || []);
      })
      .catch((err) => console.error("Error fetching:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div className={styles.titleInfo}>
          <h2>{filter === "all" ? "All Notifications" : filter}</h2>
          <span className={styles.badge}>{notifications.filter(n => !n.isRead).length} unread</span>
        </div>
        <button className={styles.markAllBtn} onClick={handleMarkAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className={styles.itemsStack}>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              data={{ ...item, isUnread: !item.isRead }}
              onRead={() => handleMarkAsRead(item.id)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}