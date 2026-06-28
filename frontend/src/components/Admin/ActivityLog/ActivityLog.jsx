import React from "react";
import styles from "./ActivityLog.module.css";
import { Users, Zap, Target } from "lucide-react";

export default function ActivityLog({ activities }) {
  const activityList = activities || [];

  const getIconColor = (type) => {
    switch (type) {
      case 'TEAM_CREATED': return '#d9dcff';
      case 'USER_JOINED': return '#e6fffa';
      default: return '#e9dcff';
    }
  };

  return (
    <div className={styles.activityWrapper}>
      <div className={styles.activityHeader}>
        <h3 className={styles.title}>Recent Activities</h3>
        <p className={styles.subTitle}>Latest updates</p>
      </div>

      <div className={styles.list}>
        {activityList.map((item, index) => (
          <div key={item.id || index} className={styles.item}>
            <div
              className={styles.iconWrapper}
              style={{ backgroundColor: getIconColor(item.type) }}
            >
              {item.type === "TEAM_CREATED" ? (
                <Users size={18} />
              ) : item.type === "USER_JOINED" ? (
                <Target size={18} />
              ) : (
                <Zap size={18} />
              )}
            </div>
            <div className={styles.text}>
              <h4>{item.message}</h4>
              <p className={styles.sub}>{new Date(item.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}