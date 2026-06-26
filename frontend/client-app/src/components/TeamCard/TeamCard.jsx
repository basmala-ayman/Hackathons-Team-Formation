import React from "react";
import { Card, Badge, Stack } from "react-bootstrap";
import styles from "./TeamCard.module.css"
import { Users, Clock, Trophy } from "lucide-react"

export default function TeamCard({ team }) {

  return (
    <Card className={styles.teamCard}>
      <Card.Body className="p-4">
        <Stack direction="horizontal" gap={3} className="justify-content-between align-items-start flex-wrap mb-3"
        >
          <div>
            <Card.Title className={styles.teamName}>{team.name}</Card.Title>
            <div className={styles.challenge}>
              <span className={styles.challengeLabel}>
                <Trophy size={14} />
                Hackathon
              </span>

              <p className={styles.challengeName}>
                {team.challenge}
              </p>
            </div>
          </div>
          <Badge
            pill
            className={`${styles.statusBadge} ${styles[team.status.toLowerCase()]}`}
          >
            {team.status === "FORMING" ? "Forming" : "Complete"}
          </Badge>
        </Stack>
        <div className={styles.cardFooter}>
          <Stack direction="horizontal" gap={4}>
            {team.role && (
              <div className={styles.metaItem}>
                <Users size={16} />
                <span>{team.role}</span>
              </div>
            )}

            {team.status === "FORMING" ? (
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>Team in Progress</span>
              </div>
            ) : (
              <div className={styles.metaItem}>
                <Trophy size={16} />
                <span>Team Complete</span>
              </div>
            )}
          </Stack>
        </div>
      </Card.Body>


    </Card>
  )

}