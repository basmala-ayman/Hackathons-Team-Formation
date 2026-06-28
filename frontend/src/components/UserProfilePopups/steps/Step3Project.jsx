import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "lucide-react";
import styles from "./steps.module.css";

export default function Step3Project({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Share your Work</h2>
      <p className={styles.stepSubtext}>Highlight your best project</p>

      <Form.Group className="mb-4">
        <Form.Label className={styles.formLabel}>Project Title<span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="TeamCatalyst Platform"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          className={styles.inputControl}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className={styles.formLabel}>Project Description<span className="text-danger">*</span></Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="A web app that connects hackathon participants to form teams..."
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          className={styles.inputControl}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Link to Project/Github</Form.Label>
        <div className="position-relative">
          {/* <Link size={18} className="position-absolute top-50 translate-middle-y ms-3" style={{ color: "var(--color-primary-dark)", zIndex: 10 }} /> */}
          <Form.Control
            type="url"
            placeholder="https://github.com/username/project"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
            className={`${styles.inputControl} ps-5`}
          />
        </div>
      </Form.Group>
    </div>
  );
}