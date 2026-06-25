import React, { useState } from "react";
import {
  Trophy, Calendar, DollarSign, Heart, ArrowUpRight, ChevronLeft,
  ChevronRight
} from "lucide-react";
import styles from "./InterestedHackathonsCard.module.css";
import CustomButton from "../../../shared/CustomButton/CustomButton";
export default function InterestedHackathonsCard({ hackathons = [] }) {
  const hasHackathons = hackathons && hackathons.length > 0;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentHackathons = hackathons.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(hackathons.length / itemsPerPage);

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
          {currentHackathons.map((hackathon) => {
            const currentCount = hackathon.interestCount || 0
            // console.log("Hackathon Object:", hackathon);
            const maxCount = 30;
            const computedProgress = (currentCount / maxCount) * 100;
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
                    {/* <div className={styles.metaItem}>
                      <DollarSign size={15} className={styles.metaIcon} />
                      <span className={styles.prizeText}>{hackathon.prizeAmount ? `$${hackathon.prizeAmount.toLocaleString()}` : "Prizes available"}</span>
                    </div> */}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={
                currentPage === i + 1
                  ? styles.activePage
                  : ""
              }
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}