import React from "react";
import { Trophy, Calendar, DollarSign, ArrowUpRight, Heart } from "lucide-react";
import styles from "./InterestedHackathonsCard.module.css";

export default function InterestedHackathonsCard() {
  const interestedHackathons = [
    {
      id: 1,
      title: "Future Cities Hackathon",
      date: "JAN 10-12, 2027",
      prize: "$15,000+ Prizes",
      interestCount: "23/30",
      progress: 76,
      isOfficial: true
    },
    {
      id: 2,
      title: "AI for Climate Action",
      date: "FEB 22-25, 2027",
      prize: "$20,000+ Prizes",
      interestCount: "15/30",
      progress: 50,
      isOfficial: false
    }
  ];

  return (
    <div className={styles.mainContainerCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <Trophy size={22} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>Interested Hackathons</h4>
        </div>
        <span className={styles.subBadgeCount}>{interestedHackathons.length} Active</span>
      </div>

      <div className={styles.hackathonsGrid}>
        {interestedHackathons.map((hackathon) => (
          <div key={hackathon.id} className={styles.hackathonMiniCard}>

            <div className={styles.cardContent}>

              <div className={styles.interestRow}>
                <span className={styles.interestLabel}>
                  <Heart size={14} className={styles.heartIcon} /> Interest Level
                </span>
                <span className={styles.interestValue}>{hackathon.interestCount}</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${hackathon.progress}%` }}></div>
              </div>

              <h5 className={styles.hackathonTitle}>{hackathon.title}</h5>

              <div className={styles.metaDetails}>
                <div className={styles.metaItem}>
                  <Calendar size={15} className={styles.metaIcon} />
                  <span>{hackathon.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <DollarSign size={15} className={styles.metaIcon} />
                  <span className={styles.prizeText}>{hackathon.prize}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}