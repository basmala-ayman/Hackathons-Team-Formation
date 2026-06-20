import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useFormHandler } from "../../hooks/useFormHandler";
import SkillsExpertiseCard from "../../components/UserProfile/SkillsExpertiseCard/SkillsExpertiseCard";
import InterestedHackathonsCard from "../../components/UserProfile/InterestedHackathonsCard/InterestedHackathonsCard";
import CompleteProfile from "../../components/UserProfile/CompleteProfile/CompleteProfile";
import ProfileWizardModal from "./../../components/UserProfilePopups/ProfileWizardModal";
import ProfileHeaderCard from "../../components/UserProfile/ProfileHeader/ProfileHeaderCard";
import MyProjectIdeasCard from "../../components/UserProfile/MyProjectIdeasCard/MyProjectIdeasCard";
import { getUserProfile, updateUserProfile } from "../../services/userService";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL

export default function UserProfile({ isOwner = true }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardMode, setWizardMode] = useState("full");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const defaultProfileData = {
    avatar: "",
    avatarFile: null,
    name: "",
    username: "@user",
    bio: "No bio added yet.",
    email: "",
    website: "",
    joinedDate: "Joined recently",
    skills: [],
    techRoles: [],
    intrestes: [],
    linkedinUrl: "",
    githubUrl: "",
    resumeUrl: "",
    resumeFile: null
  };

  const { values, setValues, handleChange, errors, setErrors } = useFormHandler(
    defaultProfileData,
  );

  useEffect(() => {
    if (isOwner) {
      setIsLoading(true);
      getUserProfile()
        .then((response) => {
          const profileData = response.data?.data || response.data || response;
          const coreProfile = profileData.profile || {};

          console.log("Raw Profile Response on Refresh:", profileData);

          let parsedSkills = Array.isArray(profileData.skills) ? profileData.skills : [];
          let parsedRoles = Array.isArray(profileData.techRoles) ? profileData.techRoles : [];

          if (profileData.profileCompletionPercentage) {
            setCompletionPercentage(profileData.profileCompletionPercentage);
          }

          let rawAvatar = coreProfile.profilePicture;

          if (rawAvatar) {
            rawAvatar = rawAvatar.startsWith("http")
              ? rawAvatar
              : `${BACKEND_URL}${rawAvatar.startsWith("/") ? "" : "/"}${rawAvatar}`;
          } else {
            rawAvatar = "";
          }

          let parsedInterests = [];
          if (Array.isArray(profileData.interests)) {
            parsedInterests = profileData.interests;
          } else
            if (Array.isArray(profileData.intrestes)) {
              parsedInterests = profileData.intrestes;
            } else if (Array.isArray(profileData.hackathonInterests)) {
              parsedInterests = profileData.hackathonInterests.map(i => typeof i === 'string' ? i : (i.title || i.name || i));
            }

          setValues({
            avatar: rawAvatar,
            avatarFile: null,
            name: coreProfile.name || "",
            username: coreProfile.username || coreProfile.email?.split("@")[0] || "user",
            bio: coreProfile.bio || "",
            email: coreProfile.email || "",
            website: coreProfile.websiteUrl || "",
            joinedDate: coreProfile.createdAt ? `Joined ${new Date(coreProfile.createdAt).toLocaleDateString()}` : "Joined recently",
            skills: parsedSkills,
            techRoles: parsedRoles,
            intrestes: parsedInterests,
            linkedinUrl: coreProfile.linkedinUrl || "",
            githubUrl: coreProfile.githubUrl || "",
            resumeUrl: coreProfile.resumeUrl || "",
            resumeFile: null,
            hackathonInterests: profileData.hackathonInterests || [],
            ownedProjects: profileData.ownedProjects || []
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
  }, [isOwner, setValues]);

  const handleProfileUpdate = async (payload, isFinal = false) => {
    try {
      setApiError(null);

      let finalPayload = payload;

      if (!(payload instanceof FormData)) {
        finalPayload = new FormData();

        finalPayload.append("name", payload.name || values.name || "User");
        finalPayload.append("bio", payload.bio || "");
        finalPayload.append("githubUrl", payload.githubUrl || "");
        finalPayload.append("linkedinUrl", payload.linkedinUrl || "");

        if (Array.isArray(payload.skills)) {
          payload.skills.forEach(skill => finalPayload.append("skills[]", skill));
        }
        if (Array.isArray(payload.techRoles)) {
          payload.techRoles.forEach(role => finalPayload.append("techRoles[]", role));
        }
        const interestsToSubmit = payload.intrestes || payload.interests;
        if (Array.isArray(interestsToSubmit)) {
          interestsToSubmit.forEach(interest => finalPayload.append("intrestes[]", interest));
        }

        if (payload.avatarFile) finalPayload.append("profilePicture", payload.avatarFile);
        if (payload.resumeFile) finalPayload.append("resume", payload.resumeFile);
      } else {
        if (!payload.has("name")) {
          payload.append("name", values.name || "User");
        }
      }

      const response = await updateUserProfile(finalPayload);

      const responseData = response?.data?.data || response?.data || response;
      const profileData = responseData.profile || {};

      setValues(prev => ({
        ...prev,
        name: profileData.name || prev.name,
        bio: profileData.bio !== undefined ? profileData.bio : prev.bio,
        githubUrl: profileData.githubUrl || prev.githubUrl,
        linkedinUrl: profileData.linkedinUrl || prev.linkedinUrl,
        avatar: profileData.profilePicture
          ? `${BACKEND_URL}${profileData.profilePicture}?t=${new Date().getTime()}`
          : prev.avatar,
        skills: profileData.skills || prev.skills,
        techRoles: profileData.techRoles || prev.techRoles,
        intrestes: profileData.interests || prev.intrestes,
        avatarFile: null
      }));

      setApiError(null);
      if (isFinal) setIsWizardOpen(false);
      return responseData;
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
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
        <CompleteProfile user={{ ...values, profileCompletionPercentage: completionPercentage }} onBannerClick={() => setIsWizardOpen(true)} />
      )}

      <ProfileHeaderCard
        user={values}
        setFormData={isOwner ? setValues : null}
        isOwner={isOwner}
        onEditClick={isOwner ? () => {
          setWizardMode("full");
          setIsWizardOpen(true);
        } : null}
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
          mode={wizardMode}
        />
      )}

      <SkillsExpertiseCard
        skills={values.skills || []}
        roles={Array.isArray(values.techRoles) ? values.techRoles : (values.techRoles ? [values.techRoles] : [])}
        interests={values.interests || values.intrestes || []}
        onAddSkillClick={() => setIsWizardOpen(true)}
        isOwner={isOwner}
        onAddSkillClick={() => {
          setWizardMode("skillsOnly");
          setIsWizardOpen(true);
        }}
      />
      <InterestedHackathonsCard hackathons={values.hackathonInterests || []} />
      <MyProjectIdeasCard projects={values.ownedProjects || []} userAvatar={values.avatar} />
    </Container>
  );
}