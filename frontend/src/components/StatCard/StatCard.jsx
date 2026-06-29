import React from "react";
import styles from "./StatCard.module.css";
import { TrendingUp, Users, Trophy, Target, Activity } from "lucide-react";
export default function StatCard({ data, role = "user" }) {
  const formattedValue = new Intl.NumberFormat().format(data.value)

  // Deterime the styles based on the title
  const getCardConfig = (title) => {
    switch (title) {
      case "Active Teams":
      case "Total users":
        return { variant: "purple", Icon: Users };
      case "Hackathons Joined":
      case "Team Formed":
        return { variant: "blue", Icon: Trophy };
      case "Achievements":
      case "AI matched":
        return { variant: "orange", Icon: Target };
      default:
        return { variant: "purple", Icon: Activity };
    }
  };

  const { variant, Icon } = getCardConfig(data.title);

  if (role === "admin") {
    return (
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.iconCircle}>{data.icon}</div>
          <div className={styles.trend}>
            <TrendingUp size={14} />
            <span>+{data.increase}%</span>
          </div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.value}>{formattedValue}</h2>
          <p className={styles.label}>{data.title}</p>
        </div>
      </div>
    )
  }

  // If the role is user
  return (
    <div className={`${styles.card} ${styles.userCard} ${styles[variant]}`}>
      <div className="d-flex justify-content-between align-items-start w-100">
        <div className={styles.leftContent}>
          <div className={styles.iconBox}>
            <Icon size={20} />
          </div>
          <div className={styles.textDetails}>
            <p className={styles.userLabel}>{data.title}</p>
            <p className={styles.subText}>{data.subText}</p>
          </div>
        </div>
        <h2 className={styles.userValue}>{data.value}</h2>
      </div>
    </div>
  );

}