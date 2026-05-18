import React from "react";
import styles from "./UserDashboard.module.css"
import StatCard from '../../components/StatCard/StatCard.jsx';
import { Users, Trophy, Target, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext/useAuth.js";
import CustomButton from "../../shared/CustomButton/CustomButton.jsx";
import TeamCard from "../../components/TeamCard/TeamCard.jsx";
export default function UserDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "User";

  // Will be replaced by backend data later
  const statsData = [
    { title: "Active Teams", value: 5, subText: "+2 this month" },
    { title: "Hackathons Joined", value: 12, subText: "3 wins" },
    { title: "Achievements", value: 8, subText: "2 new badges" },
  ];

  const mockTeams = [
    {
      id: 1,
      name: "CodeCrafters",
      challenge: "EdTech Innovation Challenge",
      status: "Active",
      members: "4/5",
      timeLeft: "3 days left"
    },
    {
      id: 2,
      name: "EcoVision Team",
      challenge: "Green Tech Hackathon 2026",
      status: "Pending",
      members: "3/4",
      timeLeft: "7 days left"
    },
    {
      id: 3,
      name: "HealthSync",
      challenge: "HealthTech Innovators",
      status: "Completed",
      members: "Full",
      achievement: "2nd Place"
    }
  ];

  return (
    <div className={`container-fluid ${styles.dashboardWrapper} py-5`}>
      <div className="container">
        {/* Header Section */}
        <header className="mb-5">
          <h1 className="fw-bold display-5" style={{ fontSize: "var(--fs-regular)", color: "var(--color-very-dark-purple)" }}>
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-muted fs-5">Here's what's happening with your hackathon journey</p>
        </header>
        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          {statsData.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <StatCard data={item} variant={item.variant} />
            </div>
          ))}
        </div>

        <div className="row g-5">
          {/* Main Content: Active Teams (Left Column) */}
          <section className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 fw-bold">My Active Teams</h2>
              <CustomButton variant="primary" size="sm" className={styles.joinBtnOverride}>
                <Plus size={18} /> Join team
              </CustomButton>
            </div>

            <div className="d-flex flex-column gap-3">
              {mockTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>


          <aside className="col-lg-4">

            <div className={`card ${styles.sidebarCard} mb-4`}>
              <h3 className={styles.sidebarTitle}>Recent Activity</h3>
              <ul className={styles.activityList}>
                <li className={styles.activityItem}>
                  <span className={`${styles.dot} ${styles.green}`}></span>
                  <div>
                    <p>Joined CodeCrafters team</p>
                    <small>2 hours ago</small>
                  </div>
                </li>

                <li className={styles.activityItem}>
                  <span className={`${styles.dot} ${styles.blue}`}></span>
                  <div>
                    <p>Won 2nd place in HealthTech</p>
                    <small>1 day ago</small>
                  </div>
                </li>

                <li className={styles.activityItem}>
                  <span className={`${styles.dot} ${styles.purple}`}></span>
                  <div>
                    <p>Earned "Team Player" badge</p>
                    <small>3 days ago</small>
                  </div>
                </li>

                <li className={styles.activityItem}>
                  <span className={`${styles.dot} ${styles.orange}`}></span>
                  <div>
                    <p>Updated profile skills</p>
                    <small>5 days ago</small>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "1.5rem" }}>
              <h3 className=" mb-4">Quick Actions</h3>
              <div className="d-grid gap-3">
                <CustomButton variant="primary" size="md">Find New Teams</CustomButton>
                <CustomButton variant="secondary" size="md">Create Team</CustomButton>
                <CustomButton variant="secondary" size="md">Explore Hackathons</CustomButton>
              </div>
            </div>
          </aside>
        </div>
      </div>

    </div>
  )
}