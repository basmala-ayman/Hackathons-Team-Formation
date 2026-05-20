import React from "react";
import { Form, Badge } from "react-bootstrap";
import styles from "./steps.module.css";

export default function Step2Interests({ formData, setFormData }) {
  const interests = formData?.interests || [];

  const predefinedInterests = [
    "HealthTech", "AI/ML", "AR/VR", "DevOps",
    "Blockchain", "IOT", "FinTech", "EdTech"
  ];

  const toggleInterest = (interest) => {
    const isSelected = interests.includes(interest);

    const updatedInterests = isSelected
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];

    setFormData((prev) => ({
      ...prev,
      interests: updatedInterests
    }));
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Show your Hackathon Interests</h2>
      <p className={styles.stepSubtext}>Select your hackathon interests</p>

      <Form.Group className="mb-4">
        <Form.Label className={styles.formLabel}>
          Hackathon Interests <span className="text-muted fw-normal">(Optional)</span>
        </Form.Label>
        <p className="text-muted fs-6 mb-3">Select the areas you're interested in for hackathons</p>

        <div className="d-flex flex-wrap gap-3 mb-4">
          {predefinedInterests.map((interest) => {
            const isSelected = interests.includes(interest);
            return (
              <Badge
                key={interest}
                pill
                onClick={() => toggleInterest(interest)}
                className={`${styles.interestTag} ${isSelected ? styles.tagSelected : ""}`}
                style={{ cursor: 'pointer' }}
              >
                {interest}
              </Badge>
            );
          })}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Add Custom Hackathon Interest</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., Cloud Computing"
          className={styles.inputControl}
        />
        <span className={styles.hintText}>
          💡 Press Enter or click suggestions to add hackathon interest
        </span>
      </Form.Group>
    </div>
  );
}