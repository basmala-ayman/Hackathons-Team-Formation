import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useFormHandler } from '../../CustomeHook/useFormHandler';
import SkillsExpertiseCard from "../../components/UserProfile/SkillsExpertiseCard/SkillsExpertiseCard";
import InterestedHackathonsCard from "../../components/UserProfile/InterestedHackathonsCard/InterestedHackathonsCard";
import CompleteProfile from "../../components/UserProfile/CompleteProfile/CompleteProfile";
import ProfileWizardModal from './../../components/UserProfilePopups/ProfileWizardModal';
import ProfileHeaderCard from "../../components/UserProfile/ProfileHeader/ProfileHeaderCard";
import MyProjectIdeasCard from "../../components/UserProfile/MyProjectIdeasCard/MyProjectIdeasCard";
import { getUserProfile, updateUserProfile } from "../../services/userService";

export default function UserProfile({ isOwner = true, initialData }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialData && isOwner);
  const [apiError, setApiError] = useState(null);

  const defaultProfileData = {
    avatar: "",
    avatarFile: null,
    name: "",
    username: "@user",
    bio: "No bio added yet.",
    location: "Egypt, Giza",
    email: "",
    website: "",
    joinedDate: "Joined recently",
    skills: [],
    techRoles: [],
    interests: [],
    linkedinUrl: "",
    githubUrl: "",
    resumeUrl: "",
    resumeFile: null
  };

  const { values, setValues, handleChange, errors, setErrors } = useFormHandler(
    initialData || defaultProfileData
  );

  useEffect(() => {
    if (initialData) return;

    if (isOwner) {
      setIsLoading(true);
      getUserProfile()
        .then((response) => {
          const profileData = response.data?.data || response.data || response;
          const coreProfile = profileData.profile || profileData;

          let parsedSkills = [];
          if (Array.isArray(profileData.skills)) {
            parsedSkills = profileData.skills;
          } else if (typeof profileData.skills === 'string') {
            try {
              parsedSkills = JSON.parse(profileData.skills);
            } catch (e) {
              parsedSkills = profileData.skills.split(",").map(s => s.trim());
            }
          }

          // let parsedRoles = [];
          let parsedRoles = "";
          if (coreProfile.techRole) {
            parsedRoles = Array.isArray(coreProfile.techRole)
              ? coreProfile.techRole
              : [coreProfile.techRole];
          }

          setValues({
            avatar: coreProfile.profilePicture || "",
            avatarFile: null,
            name: coreProfile.name || "",
            username: coreProfile.username || `@${(coreProfile.name || "").replace(/\s+/g, '')}`,
            bio: coreProfile.bio || "",
            email: coreProfile.email || "",
            website: coreProfile.websiteUrl || "",
            joinedDate: profileData.createdAt ? `Joined ${new Date(profileData.createdAt).toLocaleDateString()}` : "Joined recently",
            skills: Array.isArray(parsedSkills) ? parsedSkills : [],
            techRoles: parsedRoles,
            interests: profileData.hackathonInterests || [],
            linkedinUrl: coreProfile.linkedinUrl || "",
            githubUrl: coreProfile.githubUrl || "",
            resumeUrl: coreProfile.resumeUrl || "",
            resumeFile: null
          });
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || err.message || "Failed to load profile data.";
          setApiError(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOwner, initialData, setValues]);



  const handleProfileUpdate = async (updatedValues) => {
    try {
      setApiError(null);

      // const selectedRole = Array.isArray(updatedValues.techRoles) && updatedValues.techRoles.length > 0
      //   ? updatedValues.techRoles[0]
      //   : [];

      const selectedRole = typeof updatedValues.techRoles === "string"
        ? updatedValues.techRoles
        : (Array.isArray(updatedValues.techRoles) ? updatedValues.techRoles[0] : "");

      const flattenToStrings = (arr) => {
        if (!arr) return [];
        return arr.map(item => typeof item === "string" ? item : (item?.value || item?.name || "")).filter(Boolean);
      };

      const cleanSkills = flattenToStrings(updatedValues.skills);

      const payload = {
        bio: updatedValues.bio || "",
        techRole: selectedRole,
        githubUrl: updatedValues.githubUrl || updatedValues.github || "",
        linkedinUrl: updatedValues.linkedinUrl || updatedValues.linkedin || "",
        resumeUrl: updatedValues.resumeUrl || updatedValues.resume || "",
        profilePicture: updatedValues.profilePicture || "",
        skills: cleanSkills || []
      };

      const response = await updateUserProfile(payload);
      const serverData = response?.data?.data || response?.data || response;

      const updatedProfile = serverData.profile || serverData;

      let parsedSkills = [];
      if (Array.isArray(serverData.skills)) {
        parsedSkills = serverData.skills;
      }

      // let savedRoles = [];
      // if (updatedProfile.techRole) {
      //   savedRoles = Array.isArray(updatedProfile.techRole)
      //     ? updatedProfile.techRole
      //     : [updatedProfile.techRole];
      // }

      setValues(prev => ({
        ...prev,
        bio: updatedProfile.bio || payload.bio,
        techRole: updatedProfile.techRole || payload.techRole,
        githubUrl: updatedProfile.githubUrl || payload.githubUrl,
        linkedinUrl: updatedProfile.linkedinUrl || payload.linkedinUrl,
        resumeUrl: updatedProfile.resumeUrl || payload.resumeUrl,
        avatar: updatedProfile.profilePicture,
        skills: parsedSkills.length > 0 ? parsedSkills : (updatedValues.skills || []),
        // techRoles: savedRoles.length > 0 ? savedRoles : (updatedValues.techRoles || [])
        techRoles: selectedRole
      }));

      setIsWizardOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setApiError(err.response?.data?.message || "Failed to update profile changes.");
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4 d-flex flex-column gap-4">
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      {isOwner && (
        <CompleteProfile user={values} onBannerClick={() => setIsWizardOpen(true)} />
      )}

      <ProfileHeaderCard
        user={values}
        onEditClick={isOwner ? () => setIsWizardOpen(true) : null}
        setFormData={isOwner ? setValues : null}
        isOwner={isOwner}
      />

      {isOwner && (
        <ProfileWizardModal
          show={isWizardOpen}
          handleClose={() => setIsWizardOpen(false)}
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          errors={errors}
          setErrors={setErrors}
          onSave={handleProfileUpdate}
        />
      )}

      <SkillsExpertiseCard
        skills={values.skills || []}
        roles={values.techRoles || []}
        interests={Array.isArray(values.interests) ? values.interests.map(i => i.title || i) : []}
        onAddSkillClick={() => setIsWizardOpen(true)}
        isOwner={isOwner}
      />
      <InterestedHackathonsCard />
      <MyProjectIdeasCard userAvatar={values.avatar} />
    </Container>
  );
}