import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import styles from "./UserDashboard.module.css";
import StatCard from '../../components/StatCard/StatCard.jsx';
import TeamCard from "../../components/TeamCard/TeamCard.jsx";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";
import { Users, Trophy, Bell, Plus, Calendar } from "lucide-react";
import { getUserDashboard } from "../../services/dashboard.js";

export default function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getUserDashboard()
      .then((response) => {
        const serverData = response?.data || response;
        setDashboardData(serverData);
        console.log(serverData)
      })
      .catch((err) => {
        console.error("Dashboard Integration Error:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to load dashboard data.";
        setApiError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatActivityDate = (isoString) => {
    if (!isoString) return "Recently";
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityDotClass = (type) => {
    switch (type) {
      case "TEAM_INVITE": return styles.blue;
      case "TEAM_JOIN": return styles.green;
      case "ACHIEVEMENT": return styles.purple;
      default: return styles.orange;
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column gap-2">
        <Spinner animation="border" variant="primary" />
        <p className="text-muted fw-medium">Fetching your dashboard data...</p>
      </div>
    );
  }

  const welcomeMessage = dashboardData?.welcomeMessage || "Welcome back!";
  const metrics = dashboardData?.metrics || { activeTeamsCount: 0, recommendedTeamsCount: 0, pendingInvitationsCount: 0 };
  const activeTeams = dashboardData?.activeTeams || [];
  const recentActivities = dashboardData?.recentActivities || [];

  const statsData = [
    {
      title: "Active Teams",
      value: metrics.activeTeamsCount,
      subText: "Teams you are coding with"
    },
    {
      title: "Recommended Teams",
      value: metrics.recommendedTeamsCount,
      subText: "Matches based on your skills"
    },
    {
      title: "Pending Invitations",
      value: metrics.pendingInvitationsCount,
      subText: "Awaiting your response"
    },
  ];

  return (
    <div className={`container-fluid ${styles.dashboardWrapper} py-5`}>
      <div className="container">

        {/* Error Alert Row */}
        {apiError && (
          <Alert variant="danger" className="mb-4" onClose={() => setApiError(null)} dismissible>
            {apiError}
          </Alert>
        )}

        {/* Header Section */}
        <header className="mb-5">
          <h1 className={styles.welcomeTitle}>
            {welcomeMessage} 👋
          </h1>
          <p className={styles.subTitle}>Here's what's happening with your hackathon journey</p>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          {statsData.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <StatCard data={item} />
            </div>
          ))}
        </div>

        <div className="row g-5">
          {/* Left Column: Active Teams */}
          <section className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 fw-bold m-0">My Active Teams</h2>
              <CustomButton variant="primary" size="sm" className={styles.joinBtnOverride}>
                <Plus size={18} /> Join team
              </CustomButton>
            </div>

            <div className="d-flex flex-column gap-3">
              {activeTeams.length === 0 ? (
                <div className="text-center py-5 text-muted bg-white rounded-4 border border-dashed p-4">
                  <Users size={32} className="text-muted mb-3 opacity-50" />
                  <p className="mb-1 fw-semibold">You aren't in any active teams yet.</p>
                  <span className="small text-muted">Explore recommendations or create a catalyst team to begin!</span>
                </div>
              ) : (
                activeTeams.map((team, idx) => {
                  const normalizedTeam = {
                    id: team.id || idx,
                    name: team.name,
                    challenge: team.hackathon || "Independent Challenge",
                    status: team.role || "Member",
                    members: "Active",
                    timeLeft: "Ongoing"
                  };
                  return <TeamCard key={normalizedTeam.id} team={normalizedTeam} />;
                })
              )}
            </div>
          </section>

          {/* Right Column: Sidebar (Activities & Actions) */}
          <aside className="col-lg-4">

            {/* Recent Activity Card */}
            <div className={`card ${styles.sidebarCard} mb-4 border-0 shadow-sm p-4`} style={{ borderRadius: "1.5rem" }}>
              <h3 className={`${styles.sidebarTitle} h5 fw-bold mb-4 d-flex align-items-center gap-2`}>
                <Bell size={18} className="text-primary" /> Recent Activity
              </h3>

              {recentActivities.length === 0 ? (
                <p className="text-muted small text-center py-3">No recent activities found.</p>
              ) : (
                <ul className={`${styles.activityList} list-unstyled m-0 p-0`}>
                  {recentActivities.map((activity, index) => (
                    <li key={activity.id || index} className={`${styles.activityItem} d-flex gap-3 mb-3`}>
                      <span className={`${styles.dot} ${getActivityDotClass(activity.type)} mt-1.5`}></span>
                      <div>
                        <p className="mb-0 text-dark small fw-medium">{activity.message}</p>
                        <small className="text-muted style-v-small">{formatActivityDate(activity.date)}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "1.5rem", backgroundColor: "var(--color-white)" }}>
              <h3 className="h5 fw-bold mb-4">Quick Actions</h3>
              <div className="d-grid gap-3">
                <CustomButton variant="primary" size="md">Find New Teams</CustomButton>
                <CustomButton variant="secondary" size="md">Create Team</CustomButton>
                <CustomButton variant="secondary" size="md">Explore Hackathons</CustomButton>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div >
  );
}