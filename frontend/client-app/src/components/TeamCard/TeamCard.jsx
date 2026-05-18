import React from "react";
import { Card, Badge, Stack } from "react-bootstrap";
import styles from "./TeamCard.module.css"
import { Users, Clock, Trophy } from "lucide-react"

export default function TeamCard({ team }) {

  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "success";
      case "pending": return "warning";
      case "completed": return "secondary";
      default: return "light";
    }
  }

  return (
    <Card className={styles.teamCard}>
      <Card.Body className="p-4">
        <Stack direction="horizontal" gap={3} className="justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className={styles.teamName}>{team.name}</Card.Title>
            <Card.Text className={styles.challengeName}>{team.challenge}</Card.Text>
          </div>
          <Badge
            pill
            bg={getBadgeVariant(team.status)}
            className={`${styles.statusBadge} ${styles[team.status?.toLowerCase()]}`}
          >
            {team.status}
          </Badge>
        </Stack>
        <div className={styles.cardFooter}>
          <Stack direction="horizontal" gap={4}>
            <div className={styles.metaItem}>
              <Users size={16} />
              <span>{team.members} members</span>
            </div>

            {team.status === "Completed" ? (
              <div className={`${styles.metaItem} ${styles.achievement}`}>
                <Trophy size={16} />
                <span>{team.achievement || "Participation"}</span>
              </div>
            ) : (
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{team.timeLeft}</span>
              </div>
            )}
          </Stack>
        </div>
      </Card.Body>

    </Card>
  )

}