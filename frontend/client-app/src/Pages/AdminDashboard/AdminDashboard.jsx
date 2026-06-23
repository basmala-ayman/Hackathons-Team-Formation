import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import styles from "./AdminDashboard.module.css";
import StatCard from "../../components/StatCard/StatCard";
import ActivityLog from "../../components/Admin/ActivityLog/ActivityLog";
import GrowthChart from "../../components/Admin/Charts/GrowthChart/GrowthChart";
import TeamPieCard from "../../components/Admin/Charts/TeamPieCard/TeamPieCard";
import WeeklyActivity from "../../components/Admin/Charts/WeeklyActivity/WeeklyActivity";
import { Users, Zap, Award } from "lucide-react";
import { getAdminDashboard } from "../../services/dashboard";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminDashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError("Failed to load admin dashboard"))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(data)

  if (isLoading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const sys = data?.systemOverview || { totalUsers: 0, totalTeams: 0, completeTeams: 0 };
  const teamStats = data?.teamFormationStats || { autoMatched: 0, manual: 0, invited: 0 }

  const stats = [
    { id: 1, title: "Total Users", value: sys.totalUsers, icon: <Users size={22} /> },
    { id: 2, title: "Total Teams", value: sys.totalTeams, icon: <Zap size={22} /> },
    { id: 3, title: "Complete Teams", value: sys.completeTeams, icon: <Award size={22} /> },
  ];

  return (
    <div className="container py-5">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
      </header>

      {/* Stats */}
      <div className="row g-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.id} className="col-md-4">
            <StatCard role="admin" data={stat} />
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Charts */}
        <div className="col-lg-8">
          <div className={styles.chartCard}>
            <h3>Participant Growth</h3>
            <GrowthChart data={data.participantsGrowth} />
          </div>
          <div className={`${styles.chartCard} mt-4`}>
            <h3>Weekly Activity</h3>
            <WeeklyActivity data={data.weeklyActivity} />
          </div>
        </div>

        {/* Donut & Log */}
        <div className="col-lg-4">
          <div className={styles.chartCard}>
            <h3>Team Formation</h3>
            <TeamPieCard data={teamStats} />
          </div>
          <div className="mt-4">
            <ActivityLog activities={data.recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}