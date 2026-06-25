import React, { useState, useEffect, useMemo } from "react";
import styles from "./NotificationList.module.css";
import NotificationItem from "../NotificationItem/NotificationItem";
import { BellOff } from "lucide-react";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../../../services/notificationService";

import { useNotifications } from "../../../context/NotificationContext";

export default function NotificationList({ filter }) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    markOneAsReadLocally,
    clearUnreadLocally,
  } = useNotifications();

  const EMPTY_MESSAGES = {
    all: {
      title: "No notifications yet",
      description: "You'll see updates about invitations, matches, and hackathons here."
    },

    team: {
      title: "No team invitations",
      description: "When teams invite you to join, they'll appear here."
    },

    accepted: {
      title: "No accepted invitations",
      description: "Accepted team invitations will appear here."
    },

    declined: {
      title: "No rejected invitations",
      description: "Rejected or expired invitations will appear here."
    },
    recommendations: {
      title: "No recommendations",
      description:
        "Recommended teams will appear here.",
    },
    matches: {
      title: "No matches yet",
      description: "When we find potential team member, it will appear here."
    }
  };

  const emptyState =
    EMPTY_MESSAGES[filter] || EMPTY_MESSAGES.all;

  const FILTER_CATEGORIES = [
    { id: "all", label: "All", types: [] },
    { id: "team", label: "Team Invitations", types: ["TEAM_INVITE"] }, { id: "accepted", label: "Accepted", types: ["INVITE_ACCEPTED"] },
    { id: "declined", label: "Declined", types: ["INVITE_REJECTED"] },
    { id: "matches", label: "Matches", types: ["MATCH_FOUND"] },
    {
      id: "recommendations",
      label: "Recommendations",
      types: ["RECOMMENDATION_RECEIVED"],
    },
  ];

  const filteredNotifications = useMemo(() => {
    const category = FILTER_CATEGORIES.find(c => c.id === filter);
    if (!category || category.id === "all") return allNotifications;
    return allNotifications.filter(n => category.types.includes(n.type));
  }, [allNotifications, filter]);

  useEffect(() => {
    setLoading(true);
    getMyNotifications(1, 20)
      .then((res) =>
        setAllNotifications(
          (res.notifications || []).filter(
            (n) => n.type !== "ROUND2_AVAILABLE"
          )
        )
      )
      .catch((err) => console.error("Error fetching:", err))
      .finally(() => setLoading(false));
  }, []);

  console.log(allNotifications)

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);

    markOneAsReadLocally();

    setAllNotifications(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, isRead: true }
          : n
      )
    );
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      clearUnreadLocally();
      setAllNotifications(prev =>
        prev.map(n => ({
          ...n,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error(err);
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
          <h2>
            {FILTER_CATEGORIES.find(c => c.id === filter)?.label || "Notifications"}
          </h2>

          <span className={styles.badge}>
            {filteredNotifications.filter(n => !n.isRead).length} unread
          </span>
        </div>

        <button className={styles.markAllBtn}>
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
              onRemove={() =>
                setAllNotifications(prev =>
                  prev.filter(n => n.id !== item.id)
                )
              }
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <BellOff size={48} />
            </div>
            <h3>{emptyState.title}</h3>
            <p>{emptyState.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}