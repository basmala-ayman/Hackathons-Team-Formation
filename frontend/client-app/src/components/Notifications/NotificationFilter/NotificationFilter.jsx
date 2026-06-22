import React from "react";
import styles from "./NotificationFilter.module.css";
import { Zap, Bell, Users, CheckCircle, Filter } from "lucide-react";

export default function NotificationFilter({ activeFilter, onFilterChange, counts }) {
  const safeCounts = counts || {};
  const FILTER_CATEGORIES = [
    {
      id: "all",
      label: "All Notifications",
      icon: <Bell size={18} />,
      count: safeCounts.all || 0
    },
    {
      id: "team",
      label: "Team Requests",
      icon: <Users size={18} />,
      count: safeCounts.requests || 0
    },
    {
      id: "accepted",
      label: "Accepted",
      icon: <CheckCircle size={18} />,
      count: safeCounts.accepted || 0
    },
    {
      id: "matches",
      label: "Matches",
      icon: <Zap size={18} />,
      count: safeCounts.matches || 0
    },
  ];

  return (
    <div className={styles.filterCard}>
      <div className={styles.filterHeader}>
        <Filter size={16} />
        <span>Filter</span>
      </div>

      <ul className={styles.filterList}>
        {FILTER_CATEGORIES.map((category) => (
          <li
            key={category.id}
            className={`${styles.filterItem} ${activeFilter === category.id ? styles.active : ""}`}
            onClick={() => onFilterChange(category.id)}
          >
            <div className={styles.itemContent}>
              <span className={styles.icon}>{category.icon}</span>
              <span className={styles.label}>{category.label}</span>
            </div>
            {category.count > 0 && (
              <span className={styles.badge}>{category.count}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}