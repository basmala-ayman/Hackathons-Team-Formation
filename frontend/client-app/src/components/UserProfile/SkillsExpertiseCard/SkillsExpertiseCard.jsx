import React from "react";
import { Badge } from "react-bootstrap";
import { Code2 } from "lucide-react";
import styles from "./SkillsExpertiseCard.module.css";

export default function SkillsExpertiseCard({ techSkills = [], softSkills = [], interests = [], onAddSkillClick, isOwner }) {

  return (
    <div className={styles.skillsMainCard}>

      <div className={styles.cardHeaderRow}>
        <div className={styles.cardTitleContainer}>
          <Code2 size={20} className={styles.headerIcon} />
          <h4 className={styles.cardTitleText}>Skills & Expertise</h4>
        </div>
        {isOwner && (<button type="button" className={styles.addSkillBtn} onClick={onAddSkillClick}>
          + Add Skill
        </button>)}

      </div>

      <div className={styles.skillsContentBody}>

        {/* Hard Skills */}
        <div className={styles.skillsSection}>
          <h5 className={styles.sectionTitle}>Hard Skills</h5>
          <div className={styles.badgesWrapper}>
            {techSkills.map((skill, index) => (
              <Badge key={index} className={styles.hardSkillBadge}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className={styles.skillsSection}>
          <h5 className={styles.sectionTitle}>Soft Skills</h5>
          <div className={styles.badgesWrapper}>
            {softSkills.map((skill, index) => (
              <Badge key={index} className={styles.softSkillBadge}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hackathon Interests */}
        <div className={styles.skillsSection}>
          <h5 className={styles.sectionTitle}>Hackathon Interests</h5>
          <div className={styles.badgesWrapper}>
            {interests.map((interest, index) => (
              <Badge key={index} className={styles.interestSkillBadge}>
                {interest}
              </Badge>
            ))}
          </div>
        </div>

      </div>
    </div>

  )
}