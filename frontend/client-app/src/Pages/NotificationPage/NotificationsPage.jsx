import React, { useState } from "react";
import styles from "./NotificationsPage.module.css";
import NotificationFilter from "../../components/Notifications/NotificationFilter/NotificationFilter";
import NotificationList from "../../components/Notifications/NotificationList/NotificationList";
import CustomButton from "../../shared/CustomButton/CustomButton";

export default function NoticationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
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
          />
        </aside>
        <main className="col-lg-9">
          <NotificationList filter={activeFilter} />
        </main>
      </div>
    </div>
  );
}
