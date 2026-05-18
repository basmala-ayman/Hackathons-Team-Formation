import React from "react";
import styles from "./AdminDashboard.module.css";
import StatCard from "../../components/StatCard/StatCard";
import ActivityLog from "../../components/Admin/ActivityLog/ActivityLog";
// Import your new Chart components
import GrowthChart from "../../components/Admin/Charts/GrowthChart/GrowthChart";
import TeamPieCard from "../../components/Admin/Charts/TeamPieCard/TeamPieCard";
import WeeklyActivity from "../../components/Admin/Charts/WeeklyActivity/WeeklyActivity";

import { Users, Zap, Award } from "lucide-react";
import logo from "../../assets/logo.png";

const STATS_DATA = [
  { id: 1, title: "Total users", value: "1156", increase: 13.2, icon: <Users size={22} /> },
  { id: 2, title: "Team Formed", value: "356", increase: 9.8, icon: <Zap size={22} /> },
  { id: 3, title: "AI matched", value: "276", increase: 10.4, icon: <Award size={22} /> },
];

export default function AdminDashboard() {
  return (
    <div className="container py-5">
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
      </header>

      {/* Row 1: Stat Cards */}
      <div className="row g-4 mb-5">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="col-md-4">
            <StatCard role="admin" data={stat} />
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Row 2: Left Column (Charts) */}
        <div className="col-lg-8">
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Participant Growth</h3>
              <p>Monthly participant registrations</p>
            </div>
            <div className={styles.chartArea}>
              <GrowthChart />
            </div>
          </div>

          <div className={`${styles.chartCard} mt-4`}>
            <div className={styles.chartHeader}>
              <h3>Weekly Activity</h3>
              <p>Teams and participants over the last week</p>
            </div>
            <div className={styles.chartArea}>
              <WeeklyActivity />
            </div>
          </div>
        </div>

        {/* Row 2: Right Column (Donut & Log) */}
        <div className="col-lg-4">
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Team Formation</h3>
              <p>How teams are formed</p>
            </div>
            <div className={styles.donutArea}>
              <TeamPieCard />
            </div>
          </div>

          <div className="mt-4">
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
}