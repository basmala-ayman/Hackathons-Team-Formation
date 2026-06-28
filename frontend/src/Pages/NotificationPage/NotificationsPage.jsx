import React, { useState, useMemo } from "react";
import styles from "./NotificationsPage.module.css";
import NotificationFilter from "../../components/Notifications/NotificationFilter/NotificationFilter";
import NotificationList from "../../components/Notifications/NotificationList/NotificationList";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allNotifications, setAllNotifications] = useState([]);


  // Calculate dynamic counts based on the notification types
  const counts = useMemo(() => ({
    all: allNotifications.length,
    requests: allNotifications.filter(
      n =>
        n.type === "TEAM_INVITE" &&
        n.title !== "Team is now complete"
    ).length,
    updates: allNotifications.filter(
      n =>
        n.type === "TEAM_INVITE" &&
        n.title === "Team is now complete"
    ).length,
    accepted: allNotifications.filter(n => n.type === "INVITE_ACCEPTED").length,
    matches: allNotifications.filter(n =>
      ["MATCH_FOUND", "RECOMMENDATION_RECEIVED", "ROUND2_AVAILABLE"].includes(n.type)
    ).length,
  }), [allNotifications]);

  return (
    <div className="container py-5">
      <header className={styles.header}>
        <h1 className="fs-md-4">Notifications</h1>
        <p>Stay updated with your teams and hackathons</p>
      </header>

      <div className="row g-4">
        <aside className="col-lg-3">
          <NotificationFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </aside>
        <main className="col-lg-9">
          <NotificationList
            filter={activeFilter}
            allNotifications={allNotifications}
            setAllNotifications={setAllNotifications}
          />
        </main>
      </div>
    </div>
  );
}