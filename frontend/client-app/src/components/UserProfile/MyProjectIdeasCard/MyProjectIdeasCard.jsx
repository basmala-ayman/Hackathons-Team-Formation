import React from "react";
import { FolderHeart, Trophy, Calendar, Users, Heart } from "lucide-react";
import styles from "./MyProjectIdeasCard.module.css";

export default function MyProjectIdeasCard({ userAvatar }) {
  const myIdeas = [
    {
      id: 1,
      title: "AI-Powered Climate Monitoring System",
      desc: "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathon: "AI for Climate Action",
      date: "OCT 26-28",
      teamSize: "Team of 4",
      interestedCount: "28 interested",
      skills: ["#ML/AI", "#Frontend", "#Backend"]
    },
    {
      id: 2,
      title: "EcoTrack AI Platform",
      desc: "An enterprise-grade environmental tracking dashboard helping startups log carbon footprints dynamically and match with green tech investors seamlessly. If the description stretches, the entire card will scale down beautifully to hold every single detail without clipping.",
      hackathon: "EcoTech Challenge",
      date: "NOV 12-14",
      teamSize: "Team of 3",
      interestedCount: "14 interested",
      skills: ["#React", "#Node.js", "#DataScience", "#Python", "#DevOps", "#Cloud", "#Docker", "#UI/UX"]
    }
  ];

  const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className={styles.mainContainerCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <FolderHeart size={22} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>My Project Ideas</h4>
        </div>
      </div>

      <div className={styles.ideasGrid}>
        {myIdeas.map((idea) => (
          <div key={idea.id} className={styles.ideaCard}>

            <div className={styles.creatorHeader}>
              <div className={styles.creatorAvatarWrapper}>
                <img
                  src={userAvatar || ANONYMOUS_AVATAR}
                  alt="Creator"
                  className={styles.creatorImg}
                />
              </div>
              <div className={styles.creatorMeta}>
                <span className={styles.creatorName}>Hafsa Hikal</span>
                <span className={styles.creatorBadge}>Project Creator</span>
              </div>
            </div>

            <h5 className={styles.ideaTitle}>{idea.title}</h5>
            <p className={styles.ideaDesc}>{idea.desc}</p>

            <div className={styles.hackathonRow}>
              <div className={styles.metaItem}>
                <Trophy size={14} className={styles.metaIcon} />
                <span>{idea.hackathon}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={14} className={styles.metaIcon} />
                <span>{idea.date}</span>
              </div>
            </div>

            <div className={styles.skillsSection}>
              <h6 className={styles.skillsTitle}>Required Skills</h6>
              <div className={styles.skillsWrapper}>
                {idea.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.footerInfo}>
                <div className={styles.infoBadge}>
                  <Users size={14} /> <span>{idea.teamSize}</span>
                </div>
                <div className={styles.infoBadge}>
                  <Heart size={14} className={styles.heartIcon} /> <span>{idea.interestedCount}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}