import React from "react";
import styles from "./ActivityLog.module.css";
import { Users, Zap, Target } from "lucide-react";

const ACTIVITIES = [
  { id: 1, type: "team", title: "New team formed", sub: "Team Alpha", time: "5 min ago", color: "#d9dcff" },
  { id: 2, type: "join", title: "15 participants joined", sub: "12 min ago", time: "", color: "#e9dcff" },
  { id: 3, type: "match", title: "Match score improved", sub: "Team Beta", time: "1 hour ago", color: "#e6fffa" },
];

export default function ActivityLog() {
  return (
    <div className={styles.activityWrapper}>
      <div className={styles.activityHeader}>
        <h3 className={styles.title}>Recent Activity</h3>
        <p className={styles.subTitle}>Latest updates</p>
      </div>


      <div className={styles.list}>
        {ACTIVITIES.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.iconWrapper} style={{ backgroundColor: item.color }}>
              {item.type === "team" ? <Users size={16} /> : item.type === "join" ? <Zap size={16} /> : <Target size={16} />}
            </div>
            <div className={styles.text}>
              <h4>{item.title}</h4>
              <p>{item.sub}</p>
              {item.time && <span>{item.time}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}