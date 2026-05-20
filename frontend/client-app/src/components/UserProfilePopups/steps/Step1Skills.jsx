import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";
import { X, ChevronDown } from "lucide-react";
import styles from "./steps.module.css";

export default function Step1Skills({ formData, setFormData, errors, setErrors }) {
  const [skillInput, setSkillInput] = useState("");
  // const [roleInput, setRoleInput] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const allAvailableSkills = ["React", "Typescript", "Javascript", "Vuejs", "Angular", "C++", "Go", "Leadership", "Communication", "Teamwork"];
  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "DevOps Engineer"];

  const handleBioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, bio: value }));
    if (errors.bio && value.trim()) setErrors((prev) => ({ ...prev, bio: null }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, techRoles: role }));
    if (errors.techRoles) setErrors((prev) => ({ ...prev, techRoles: null }));
    setShowRoleDropdown(false);
  };

  const addTag = (value, list, key) => {
    if (list.includes(value) && !(formData[key] || []).includes(value)) {
      setFormData((prev) => ({ ...prev, [key]: [...(prev[key] || []), value] }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const removeTag = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: prev[key].filter((item) => item !== value) }));
  };

  return (
    <div className={styles.stepContainer}>
      {/* UX FIX: Updated copy to say Skills instead of Technical/Soft */}
      <h2 className={styles.stepTitle}>Showcase your Skills</h2>
      <p className={styles.stepSubtext}>Select your profile skills and roles</p>

      {/* --- Skills Selection --- */}
      <Form.Group className="mb-4 position-relative">
        <Form.Label className={styles.formLabel}>Skills <span className="text-danger">*</span></Form.Label>
        <div className={styles.selectWrapper}>
          <Form.Control
            type="text"
            className={`${styles.inputControl} ${errors.skills ? 'is-invalid' : ''}`}
            placeholder="e.g., React, UI/UX Design, Communication..."
            value={skillInput}
            onChange={(e) => { setSkillInput(e.target.value); setShowSkillDropdown(true); }}
            onFocus={() => setShowSkillDropdown(true)}
            onBlur={() => setTimeout(() => setShowSkillDropdown(false), 200)}
          />
          <ChevronDown
            onMouseDown={(e) => {
              e.preventDefault(); // Prevents input from losing focus
              setShowSkillDropdown((prev) => !prev);
            }}
            className={styles.dropdownIcon}
            size={18}
          />
        </div>

        {errors.skills && <div className="text-danger mt-1" >{errors.skills}</div>}

        {showSkillDropdown && (
          <div className={styles.suggestionsDropdown}>
            {allAvailableSkills
              .filter(s => s.toLowerCase().includes(skillInput.toLowerCase()))
              .map(skill => (
                <div
                  key={skill}
                  className={styles.suggestionItem}
                  onMouseDown={() => {
                    addTag(skill, allAvailableSkills, 'skills');
                    setSkillInput('');
                    setShowSkillDropdown(false);
                  }}
                >
                  {skill}
                </div>
              ))}
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
        <Form.Label className={styles.formLabel}>Preferred Role <span className="text-danger">*</span></Form.Label>
        <div className={styles.selectWrapper}>
          <Form.Control
            type="text"
            readOnly // Keeps it behaving like a true dropdown pick
            className={`${styles.inputControl} ${errors.techRoles ? 'is-invalid' : ''} cursor-pointer`}
            placeholder="Select your role..."
            value={formData.techRoles || ""} // Displays the single string directly
            onClick={() => setShowRoleDropdown((prev) => !prev)}
            onBlur={() => setTimeout(() => setShowRoleDropdown(false), 200)}
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

        {errors.techRoles && <div className="text-danger mt-1" >{errors.techRoles}</div>}

        {/* {showRoleDropdown && (
          <div className={styles.suggestionsDropdown}>
            {roles
              .filter(r => r.toLowerCase().includes(roleInput.toLowerCase()))
              .map(role => (
                <div
                  key={role}
                  className={styles.suggestionItem}
                  onMouseDown={() => {
                    addTag(role, roles, 'techRoles');
                    setRoleInput('');
                    setShowRoleDropdown(false);
                  }}
                >
                  {role}
                </div>
              ))}
          </div>
        )} */}
        {showRoleDropdown && (
          <div className={styles.suggestionsDropdown}>
            {roles.map(role => (
              <div
                key={role}
                className={styles.suggestionItem}
                onMouseDown={() => handleRoleSelect(role)}
              >
                {role}
              </div>
            ))}
          </div>
        )}
        {/* <div className="d-flex flex-wrap gap-2 mt-3">
          {(formData.techRoles || []).map((role) => (
            <Badge key={role} pill className={styles.skillBadge}>
              {role} <X size={14} className="cursor-pointer" onClick={() => removeTag(role, 'techRoles')} />
            </Badge>
          ))}
        </div> */}
      </Form.Group>

      {/* --- Bio --- */}
      <Form.Group className="mb-3">
        <Form.Label className={styles.formLabel}>Bio <span className="text-danger">*</span></Form.Label>
        <Form.Control
          as="textarea"
          className={`${styles.inputControl} ${errors.bio ? 'is-invalid' : ''}`}
          rows={4}
          placeholder="Tell us about yourself..."
          value={formData.bio || ""}
          onChange={handleBioChange}
          maxLength={500}
        />
        {errors.bio && <div className="text-danger mt-1">{errors.bio}</div>}
        <span className={styles.hintText}>{(formData.bio || "").length}/500 characters</span>
      </Form.Group>
    </div>
  );
}