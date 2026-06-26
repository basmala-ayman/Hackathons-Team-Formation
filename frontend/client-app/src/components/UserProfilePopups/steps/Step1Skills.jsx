import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";
import { X, ChevronDown } from "lucide-react";
import styles from "./steps.module.css";
import { useStaticData } from "../../../hooks/useStaticData.js";

export default function Step1Skills({ formData, setFormData, errors, setErrors, mode = "full" }) {
  const { roleOptions, skillsOptions, hackathonInterests } = useStaticData();
  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const allAvailableSkills = skillsOptions.map(s => s.label);
  const roles = roleOptions.map(r => r.label);
  // const hackathonInterests = hackathonOptions.map(h=>h.label)
  const interests = hackathonInterests;
  console.log(interests)

  const handleBioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, bio: value }));
  };

  const addTag = (value, list, key) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    if (!(formData[key] || []).includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), trimmed],
      }));

      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: null }));
      }
    }
  };

  const removeTag = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: (prev[key] || []).filter((item) => item !== value) }));
  };

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
      <h2 className={styles.stepTitle}>Showcase your Skills</h2>
      <p className={styles.stepSubtext}>Select your profile skills and roles</p>

      {/* --- Skills Selection --- */}
      <Form.Group className="mb-4 position-relative">
        <Form.Label className={styles.formLabel}>Skills <span className="text-danger">*</span></Form.Label>
        <div className={styles.selectWrapper}>
          <Form.Control
            type="text"
            className={`${styles.inputControl} ${errors.skills ? "is-invalid" : ""}`}
            placeholder="e.g., React, UI/UX Design..."
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value);
              setShowSkillDropdown(true);
            }}
            onFocus={() => setShowSkillDropdown(true)}
            onBlur={() => setTimeout(() => setShowSkillDropdown(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (skillInput.trim()) {
                  addTag(skillInput, allAvailableSkills, "skills");
                  setSkillInput("");
                  setShowSkillDropdown(false);
                }
              }
            }}
          />
          <ChevronDown
            onMouseDown={(e) => {
              e.preventDefault();
              setShowSkillDropdown((prev) => !prev);
            }}
            className={styles.dropdownIcon}
            size={18}
          />
        </div>

        {errors.skills && <div className="text-danger mt-1">{errors.skills}</div>}

        {showSkillDropdown && (
          <div className={styles.suggestionsDropdown}>
            {(() => {
              const filtered = allAvailableSkills.filter((s) =>
                s.toLowerCase().includes(skillInput.toLowerCase())
              );

              return (
                <>
                  {filtered.map((skill) => (
                    <div
                      key={skill}
                      className={styles.suggestionItem}
                      onMouseDown={() => {
                        addTag(skill, allAvailableSkills, "skills");
                        setSkillInput("");
                        setShowSkillDropdown(false);
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2 mt-3">
          {(formData.skills || []).map((skill) => (
            <Badge key={skill} pill className={styles.skillBadge}>
              {skill} <X size={14} className="cursor-pointer" onClick={() => removeTag(skill, 'skills')} />
            </Badge>
          ))}
        </div>
      </Form.Group>

      {/* --- Role Selection --- */}
      <Form.Group className="mb-4 position-relative">
        <Form.Label className={styles.formLabel}>Preferred Roles <span className="text-danger">*</span></Form.Label>
        <div className={styles.selectWrapper}>
          <Form.Control
            type="text"
            className={`${styles.inputControl} ${errors.techRoles ? 'is-invalid' : ''}`}
            placeholder="Type or select your role(s)..."
            value={roleInput}
            onChange={(e) => { setRoleInput(e.target.value); setShowRoleDropdown(true); }}
            onFocus={() => setShowRoleDropdown(true)}
            onBlur={() => setTimeout(() => setShowRoleDropdown(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (roleInput.trim()) {
                  addTag(roleInput, roles, "techRoles");
                  setRoleInput("");
                  setShowRoleDropdown(false);
                }
              }
            }}
          />
          <ChevronDown
            onMouseDown={(e) => {
              e.preventDefault();
              setShowRoleDropdown((prev) => !prev);
            }}
            className={styles.dropdownIcon}
            size={18}
          />
        </div>

        {errors.techRoles && <div className="text-danger mt-1">{errors.techRoles}</div>}

        {showRoleDropdown && (
          <div className={styles.suggestionsDropdown}>
            {(() => {
              const filtered = roles.filter((r) =>
                r.toLowerCase().includes(roleInput.toLowerCase())
              );

              return (
                <>
                  {filtered.map((role) => (
                    <div
                      key={role}
                      className={styles.suggestionItem}
                      onMouseDown={() => {
                        addTag(role, roles, "techRoles");
                        setRoleInput("");
                        setShowRoleDropdown(false);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2 mt-3">
          {(formData.techRoles || []).map((role) => (
            <Badge key={role} pill className={styles.skillBadge}>
              {role} <X size={14} className="cursor-pointer" onClick={() => removeTag(role, 'techRoles')} />
            </Badge>
          ))}
        </div>
      </Form.Group>

      {/* --- Hackathon Interests Section --- */}
      {mode === 'skillsOnly' && (
        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>Hackathon Interests</Form.Label>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {hackathonInterests.map((interest) => {
              const isSelected =
                (formData.intrestes || []).includes(interest.value)
              return (
                <Badge
                  key={interest.value}
                  pill
                  onClick={() => toggleInterest(interest.value)}
                  className={`${styles.interestTag} ${isSelected ? styles.tagSelected : ""
                    }`}
                  style={{
                    cursor: "pointer",
                    opacity: isSelected ? 1 : 0.6,
                  }}
                >
                  {interest.label}
                </Badge>
              );
            })}
          </div>
        </Form.Group>
      )}

      {/* --- Bio --- */}
      {mode === "full" && (
        <Form.Group className="mb-3">
          <Form.Label className={styles.formLabel}>Bio</Form.Label>
          <Form.Control
            as="textarea"
            className={`${styles.inputControl} ${errors.bio ? 'is-invalid' : ''}`}
            rows={4}
            placeholder="Tell us about yourself..."
            value={formData.bio || ""}
            onChange={handleBioChange}
            maxLength={500}
          />
          <span className={styles.hintText}>{(formData.bio || "").length}/500 characters</span>
        </Form.Group>
      )}
    </div>
  );
}