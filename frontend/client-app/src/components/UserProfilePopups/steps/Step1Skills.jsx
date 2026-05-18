import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";
import { X } from "lucide-react";
import styles from "./steps.module.css";

export default function Step1Skills({ formData, setFormData, errors, setErrors }) {
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const defaultTechSkills = ["React", "Typescript", "Javascript", "Vuejs", "Angular", "C++", "Go"];
  const defaultSoftSkills = ["Leadership", "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Creativity", "Time Management"];

  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [showSoftDropdown, setShowSoftDropdown] = useState(false);

  const handleBioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, bio: value }));
    if (errors.bio && value.trim()) {
      setErrors((prev) => ({ ...prev, bio: null }));
    }
  };

  const filteredTech = defaultTechSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(techInput.toLowerCase()) &&
      !(formData.technicalSkills || []).includes(skill)
  );

  const filteredSoft = defaultSoftSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(softInput.toLowerCase()) &&
      !(formData.softSkills || []).includes(skill)
  );

  const addTechSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !(formData.technicalSkills || []).includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        technicalSkills: [...(prev.technicalSkills || []), trimmed],
      }));
      if (errors.technicalSkills) {
        setErrors((prev) => ({ ...prev, technicalSkills: null }));
      }
    }
    setTechInput("");
    setShowTechDropdown(false);
  };

  const addSoftSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !(formData.softSkills || []).includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        softSkills: [...(prev.softSkills || []), trimmed],
      }));
      if (errors.softSkills) {
        setErrors((prev) => ({ ...prev, softSkills: null }));
      }
    }
    setSoftInput("");
    setShowSoftDropdown(false);
  };

  const handleTechKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (techInput.trim()) addTechSkill(techInput);
    }
  };

  const handleSoftKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (softInput.trim()) addSoftSkill(softInput);
    }
  };

  const removeTechSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const removeSoftSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Showcase your Skills</h2>
      <p className={styles.stepSubtext}>Select your technical/soft skills</p>

      {/* ------- Technical Skills ------- */}
      <Form.Group className="mb-4 position-relative">
        <Form.Label className={styles.formLabel}>Technical Skills<span className="text-danger">*</span></Form.Label>

        <Form.Control
          type="text"
          placeholder="e.g., Figma, Photoshop..."
          className={`${styles.inputControl} ${errors.technicalSkills ? "border-danger" : ""}`}
          value={techInput}
          onChange={(e) => {
            setTechInput(e.target.value);
            setShowTechDropdown(true);
          }}
          onFocus={() => setShowTechDropdown(true)}
          onBlur={() => setTimeout(() => setShowTechDropdown(false), 200)}
          onKeyDown={handleTechKeyDown}
        />
        <span className={styles.hintText}>💡 Press Enter or click suggestions to add skills</span>

        {showTechDropdown && filteredTech.length > 0 && (
          <div className={styles.suggestionsDropdown}>
            {filteredTech.map((skill) => (
              <div key={skill} className={styles.suggestionItem} onMouseDown={() => addTechSkill(skill)}>
                {skill}
              </div>
            ))}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2 mt-3">
          {(formData.technicalSkills || []).map((skill, index) => (
            <Badge key={index} pill className={styles.skillBadge}>
              {skill}
              <X size={14} className="ms-2 cursor-pointer" onClick={() => removeTechSkill(skill)} />
            </Badge>
          ))}
        </div>
        {errors.technicalSkills && (
          <span className="text-danger fs-5 mt-1 d-block">{errors.technicalSkills}</span>
        )}
      </Form.Group>

      {/* ------- Soft Skills ------- */}
      <Form.Group className="mb-4 position-relative">
        <Form.Label className={styles.formLabel}>Soft Skills<span className="text-danger">*</span></Form.Label>

        <Form.Control
          type="text"
          placeholder="e.g., Leadership, Communication..."
          className={`${styles.inputControl} ${errors.softSkills ? "border-danger" : ""}`}
          value={softInput}
          onChange={(e) => {
            setSoftInput(e.target.value);
            setShowSoftDropdown(true);
          }}
          onFocus={() => setShowSoftDropdown(true)}
          onBlur={() => setTimeout(() => setShowSoftDropdown(false), 200)}
          onKeyDown={handleSoftKeyDown}
        />
        <span className={styles.hintText}>💡 Press Enter or click suggestions to add skills</span>

        {showSoftDropdown && filteredSoft.length > 0 && (
          <div className={styles.suggestionsDropdown}>
            {filteredSoft.map((skill) => (
              <div key={skill} className={styles.suggestionItem} onMouseDown={() => addSoftSkill(skill)}>
                {skill}
              </div>
            ))}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2 mt-3">
          {(formData.softSkills || []).map((skill, index) => (
            <Badge key={index} pill className={styles.skillBadge}>
              {skill}
              <X size={14} className="ms-2 cursor-pointer" onClick={() => removeSoftSkill(skill)} />
            </Badge>
          ))}
        </div>
        {errors.softSkills && (
          <span className="text-danger fs-5 mt-1 d-block">{errors.softSkills}</span>
        )}
      </Form.Group>

      {/* ------- Bio ------- */}
      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Bio<span className="text-danger">*</span></Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Tell us about yourself, your passion, and what drives you..."
          name="bio"
          value={formData.bio || ""}
          onChange={handleBioChange}
          className={`${styles.inputControl} ${errors.bio ? "border-danger" : ""}`}
          maxLength={500}
        />
        {errors.bio ? (
          <span className="text-danger fs-5 mt-1 d-block">{errors.bio}</span>
        ) : (
          <span className={styles.hintText}>{(formData.bio || "").length}/500 characters</span>
        )}
      </Form.Group>
    </div>
  );
}