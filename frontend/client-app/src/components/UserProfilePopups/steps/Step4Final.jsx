import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { User, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, CloudUploadIcon } from "../../../shared/Icons/GoogleGithubIcons.jsx";
import styles from "./steps.module.css";
const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Step4Final({ formData, setFormData, handleChange }) {
  const avatarInputRef = useRef(null);
  const cvInputRef = useRef(null);

  // Compress image before saving to speed up the saving task
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.7);
        };
      };
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const compressedFile = await compressImage(file);
    const localImageUrl = URL.createObjectURL(compressedFile);

    setFormData((prev) => ({
      ...prev,
      avatar: localImageUrl,
      avatarFile: compressedFile,
    }));
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      resumeFile: file,
      resumeUrl: file.name,
    }));
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

            {formData.resumeUrl ? (
              <div className="d-flex align-items-center gap-2 text-success justify-content-center">
                <FileText size={18} />
                <span className="fw-semibold text-truncate" style={{ maxWidth: "180px" }}>{formData.resumeUrl}</span>
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
            name="linkedinUrl"
            value={formData.linkedinUrl || formData.linkedin || ""}
            onChange={handleChange}
            className={styles.innerBlankInput}
          />
        </div>
      </Form.Group>

      {/* ------- Github URL ------- */}
      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Github URL</Form.Label>
        <div className={styles.inputIconWrapper}>
          <GithubIcon size={20} className={styles.fieldIcon} />
          <Form.Control
            type="url"
            placeholder="https://github.com/yourusername"
            name="githubUrl"
            value={formData.githubUrl || formData.github || ""}
            onChange={handleChange}
            className={styles.innerBlankInput}
          />
        </div>
      </Form.Group>
    </div>
  );
}