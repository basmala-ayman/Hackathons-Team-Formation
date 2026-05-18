import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useFormHandler } from '../../CustomeHook/useFormHandler';
// import styles from "./UserProfile.module.css"
import SkillsExpertiseCard from "../../components/UserProfile/SkillsExpertiseCard/SkillsExpertiseCard";
import InterestedHackathonsCard from "../../components/UserProfile/InterestedHackathonsCard/InterestedHackathonsCard";
import CompleteProfile from "../../components/UserProfile/CompleteProfile/CompleteProfile";
import ProfileWizardModal from './../../components/UserProfilePopups/ProfileWizardModal';
import ProfileHeaderCard from "../../components/UserProfile/ProfileHeader/ProfileHeaderCard";
import MyProjectIdeasCard from "../../components/UserProfile/MyProjectIdeasCard/MyProjectIdeasCard";

export default function UserProfile() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { values, setValues, handleChange, errors, setErrors } = useFormHandler({
    avatar: "",
    name: "Omar H.",
    username: "@OmarH.",
    bio: "Full-stack developer...",
    location: "Egypt, Giza",
    email: "omarhaitham@gmail.com",
    website: "omarhaitham.dev",
    joinedDate: "Joined Oct 2026",
    technicalSkills: ["React", "Typescript"],
    softSkills: ["Teamwork", "Communication"],
    interests: ["Web Development", "DevOps"],
    linkedin: "",
    github: ""
  });

  return (
    <Container className="py-4 d-flex flex-column gap-4">
      <CompleteProfile onBannerClick={() => setIsWizardOpen(true)} />
      <ProfileHeaderCard
        user={values}
        onEditClick={() => setIsWizardOpen(true)}
        setFormData={setValues}
      />
      <ProfileWizardModal
        show={isWizardOpen}
        handleClose={() => setIsWizardOpen(false)}
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
      />
      <SkillsExpertiseCard
        techSkills={values.technicalSkills}
        softSkills={values.softSkills}
        interests={values.interests}
        onAddSkillClick={() => setIsWizardOpen(true)} />
      <InterestedHackathonsCard />
      <MyProjectIdeasCard userAvatar={values.avatar} />
    </Container>
  )

}