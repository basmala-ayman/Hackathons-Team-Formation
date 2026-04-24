import React from "react";
import styles from "./StatCard.module.css";
import { TrendingUp } from "lucide-react";

export default function StatCard({ data }) {
  const formattedValue = new Intl.NumberFormat().format(data.value)
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