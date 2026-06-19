import React from "react";
import { Trophy, Calendar, DollarSign, Heart, ArrowUpRight } from "lucide-react";
import styles from "./InterestedHackathonsCard.module.css";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { useNavigate } from 'react-router-dom';
export default function InterestedHackathonsCard({ hackathons = [] }) {
  const hasHackathons = hackathons && hackathons.length > 0;
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainerCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <Trophy size={22} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>Interested Hackathons</h4>
        </div>
        <span className={styles.subBadgeCount}>{hackathons.length} Active</span>
      </div>

      {!hasHackathons ? (
        <div className={styles.emptyStateContainer}>
          <p className={styles.emptyStateTitle}>
            No interested hackathons added yet.
          </p>
          <span className={styles.emptyStateSubtext}>
            Explore upcoming hackathons on the platform to add them here!
          </span>
        </div>
      ) : (
        <div className={styles.hackathonsGrid}>
          {hackathons.map((hackathon) => {
            const currentCount = hackathon.interestCount || 0;
            const maxCount = 30;
            const computedProgress = (currentCount / maxCount) * 100;
            const countString = `${currentCount}/${maxCount}`;
            return (
              <div key={hackathon.id || hackathon.title} className={styles.hackathonMiniCard}>
                <div className={styles.cardContent}>
                  <div className={styles.interestRow}>
                    <span className={styles.interestLabel}>
                      <Heart size={14} className={styles.heartIcon} /> Interest Level
                    </span>
                    <span className={styles.interestValue}>{currentCount}/{maxCount}</span>
                  </div>

                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${computedProgress}%` }}
                    ></div>
                  </div>

                  <h5 className={styles.hackathonTitle}>{hackathon.title}</h5>

                  <div className={styles.metaDetails}>
                    <div className={styles.metaItem}>
                      <Calendar size={15} className={styles.metaIcon} />
                      <span>{hackathon.location} ({hackathon.status})</span>
                    </div>
                    <div className={styles.metaItem}>
                      <DollarSign size={15} className={styles.metaIcon} />
                      <span className={styles.prizeText}>Prizes available</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}