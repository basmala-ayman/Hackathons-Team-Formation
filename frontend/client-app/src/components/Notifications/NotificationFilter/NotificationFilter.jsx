import React from "react";
import styles from "./NotificationFilter.module.css";
import { Bell, Users, CheckCircle, MessageSquare, Filter } from "lucide-react";

const FILTER_CATEGORIES = [
  { id: "all", label: "All Notifications", count: 8, icon: <Bell size={18} /> },
  { id: "requests", label: "Team Requests", count: 2, icon: <Users size={18} /> },
  { id: "accepted", label: "Accepted", count: 1, icon: <CheckCircle size={18} /> },
  // { id: "messages", label: "Messages", count: 1, icon: <MessageSquare size={18} /> },
];

export default function NotificationFilter({ activeFilter, onFilterChange }) {
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
            className={`${styles.filterItem} ${activeFilter === category.id ? styles.active : ""
              }`}
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