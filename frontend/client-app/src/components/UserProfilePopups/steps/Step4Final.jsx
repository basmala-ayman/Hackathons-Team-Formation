import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { User, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, CloudUploadIcon } from "../../../shared/Icons/GoogleGithubIcons.jsx";
import styles from "./steps.module.css";
const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Step4Final({ formData, setFormData, handleChange }) {
  const avatarInputRef = useRef(null);
  const cvInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: localImageUrl,
        avatarFile: file
      }));
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cvFile: file,
        cvName: file.name
      }));
    }
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Final Touch</h2>
      <p className={styles.stepSubtext}>Add your profile photo, CV/Resume and professional links</p>

      {/* ------- Drag & Drop Box ------- */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-5">
          <Form.Label className={styles.formLabel}>Profile Photo</Form.Label>
          <div
            className={styles.avatarUploadBox}
            onClick={() => avatarInputRef.current.click()}
          >
            <img
              src={formData.avatar || ANONYMOUS_AVATAR}
              alt="Preview"
              className={styles.wizardAvatarPreview}
            />
            <div className={styles.avatarUploadOverlay}>
              <CloudUploadIcon size={20} className="m-0" />
              <span>Change</span>
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="d-none"
            />
          </div>
        </div>

        <div className="col-12 col-md-7">
          <Form.Label className={styles.formLabel}>Resume / CV</Form.Label>
          <div
            className={styles.dragBox}
            onClick={() => cvInputRef.current.click()}
          >
            <CloudUploadIcon size={32} className="mb-2" style={{ color: "var(--color-primary-dark)" }} />

            {formData.cvName ? (
              <div className="d-flex align-items-center gap-2 text-success justify-content-center">
                <FileText size={18} />
                <span className="fw-semibold text-truncate" style={{ maxWidth: "180px" }}>{formData.cvName}</span>
              </div>
            ) : (
              <>
                <p className="fw-bold small mb-1 text-dark">Click to upload or drag and drop</p>
                <p className="text-muted small mb-0">PDF, DOC up to 10MB</p>
              </>
            )}

            <input
              type="file"
              ref={cvInputRef}
              onChange={handleCvChange}
              accept=".pdf,.doc,.docx"
              className="d-none"
            />
          </div>
        </div>
      </div>

      {/* ------- LinkedIn URL ------- */}
      <Form.Group className="mb-4">
        <Form.Label className={styles.formLabel}>LinkedIn URL</Form.Label>
        <div className={styles.inputIconWrapper}>
          <LinkedinIcon size={20} className={styles.fieldIcon} />
          <Form.Control
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange("linkedin", null)}
            className={styles.innerBlankInput}
          />
        </div>
      </Form.Group>

      {/* ------- GitHub URL ------- */}
      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Github URL</Form.Label>
        <div className={styles.inputIconWrapper}>
          <GithubIcon size={20} className={styles.fieldIcon} />
          <Form.Control
            type="url"
            placeholder="https://github.com/yourusername"
            name="github"
            value={formData.github || ""}
            onChange={handleChange("github", null)}
            className={styles.innerBlankInput}
          />
        </div>
      </Form.Group>
    </div>
  );
}