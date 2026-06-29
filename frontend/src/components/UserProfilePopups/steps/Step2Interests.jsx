import React, {useEffect} from "react";
import { Form, Badge } from "react-bootstrap";
import styles from "./steps.module.css";
import { useStaticData } from "../../../hooks/useStaticData.js";

export default function Step2Interests({ formData, setFormData }) {
  const { hackathonInterests } = useStaticData();

  console.log("Hackathon Interests:", hackathonInterests);
  console.log("Form Data:", formData);
  const interests = formData.intrestes || [];

  const predefinedInterests = hackathonInterests;

  useEffect(() => {
    console.log("Current formData.intrestes:", formData.intrestes);
  }, [formData.intrestes]);

  const toggleInterest = (interest) => {
    const current = formData.intrestes || [];

    const updated = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setFormData((prev) => ({
      ...prev,
      intrestes: updated,
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
            const isSelected =
              (formData.intrestes || []).includes(interest.value);

            return (
              <Badge
                key={interest.value}
                pill
                onClick={() => toggleInterest(interest.value)}
                className={`${styles.interestTag} ${isSelected ? styles.tagSelected : ""
                  }`}
                style={{ cursor: "pointer" }}
              >
                {interest.label}
              </Badge>
            );
          })}
        </div>
      </Form.Group>
    </div>
  );
}