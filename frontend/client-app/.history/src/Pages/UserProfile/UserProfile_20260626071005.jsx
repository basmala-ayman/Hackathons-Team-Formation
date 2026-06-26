import React, { useState, useEffect, useCallback } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useFormHandler } from "../../hooks/useFormHandler";
import SkillsExpertiseCard from "../../components/UserProfile/SkillsExpertiseCard/SkillsExpertiseCard";
import InterestedHackathonsCard from "../../components/UserProfile/InterestedHackathonsCard/InterestedHackathonsCard";
import CompleteProfile from "../../components/UserProfile/CompleteProfile/CompleteProfile";
import ProfileWizardModal from "./../../components/UserProfilePopups/ProfileWizardModal";
import ProfileHeaderCard from "../../components/UserProfile/ProfileHeader/ProfileHeaderCard";
import MyProjectIdeasCard from "../../components/UserProfile/MyProjectIdeasCard/MyProjectIdeasCard";
import { getUserProfile, updateUserProfile } from "../../services/userService";
import { useAuth } from "../../context/AuthContext/useAuth";
import { getAvatarUrl } from "../../utils/getAvatarUrl";
import { LoadingState } from "../../shared/States";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL

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

const VALID_INTERESTS = new Set([
  "AR_VR", "BEGINNER_FRIENDLY", "BLOCKCHAIN", "COMMUNICATION",
  "CYBERSECURITY", "DATABASES", "DESIGN", "DEVOPS", "ECOMMERCE_RETAIL",
  "EDUCATION", "ENTERPRISE", "FINTECH", "GAMING", "HEALTH", "IOT",
  "LIFEHACKS", "LOW_NO_CODE", "MACHINE_LEARNING_AI", "MOBILE",
  "MUSIC_ART", "OPEN_ENDED", "PRODUCTIVITY", "QUANTUM",
  "ROBOTIC_PROCESS_AUTOMATION", "SERVERLESS", "SOCIAL_GOOD",
  "VOICE_SKILLS", "WEB"
]);

export default function UserProfile({ isOwner = true }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardMode, setWizardMode] = useState("full");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { setUser } = useAuth();

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

          let parsedSkills = Array.isArray(profileData.skills) ? profileData.skills : [];
          let parsedRoles = Array.isArray(profileData.techRoles) ? profileData.techRoles : [];

          if (profileData.profileCompletionPercentage) {
            setCompletionPercentage(profileData.profileCompletionPercentage);
          }
          let rawAvatar = getAvatarUrl(coreProfile.profilePicture);


          let parsedInterests = [];

          if (Array.isArray(profileData.intrestes)) {
            parsedInterests = profileData.intrestes.filter(i => VALID_INTERESTS.has(i));
          } else if (Array.isArray(profileData.interests)) {
            parsedInterests = profileData.interests.filter(i => VALID_INTERESTS.has(i));
          } else if (Array.isArray(profileData.hackathonInterests)) {
            parsedInterests = profileData.hackathonInterests
              .map(i => typeof i === "string" ? i : i.value)
              .filter(i => VALID_INTERESTS.has(i));
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


  const handleProfileUpdate = useCallback(async (payload, isFinal = false) => {
    try {
      setApiError(null);

      let finalPayload;

      if (payload instanceof FormData) {
        if (!payload.get('profilePicture') && values.avatarFile) {
          payload.append('profilePicture', values.avatarFile);
        }
        finalPayload = payload;
      } else {
        finalPayload = new FormData();
        finalPayload.append("name", payload.name || values.name || "User");
        finalPayload.append("bio", payload.bio || values.bio || "");
        finalPayload.append("githubUrl", payload.githubUrl || values.githubUrl || "");
        finalPayload.append("linkedinUrl", payload.linkedinUrl || values.linkedinUrl || "");

        const fileToUpload = payload.avatarFile || values.avatarFile;

        if (fileToUpload instanceof File) {
          finalPayload.append("profilePicture", fileToUpload);
        }

        const skills = payload.skills || values.skills || [];
        skills.forEach(s => finalPayload.append("skills[]", s));

        const roles = payload.techRoles || values.techRoles || [];
        roles.forEach(r => finalPayload.append("techRoles[]", r));

        const interests = payload.intrestes || payload.interests || values.intrestes || [];
        interests.forEach(i =>
          finalPayload.append("intrestes[]", i)
        );
      }

      const response = await updateUserProfile(finalPayload);

      const responseData = response?.data?.data || response?.data || response;
      const profileData = responseData.profile || {};

      let newAvatar = values.avatar;

      if (profileData.profilePicture) {
        const baseUrl = BACKEND_URL.replace("/api/v1", "");
        let picPath = profileData.profilePicture;

        if (picPath.startsWith("http")) {
          newAvatar = `${picPath}?t=${Date.now()}`;
        } else {
          // relative path
          if (picPath.includes("/api/v1")) picPath = picPath.replace("/api/v1", "");
          if (!picPath.startsWith("/")) picPath = `/${picPath}`;
          newAvatar = `${baseUrl}${picPath}?t=${Date.now()}`;
        }
      }

      const profile = await getUserProfile();
      const latestProfile = profile.data?.data || profile.data || profile;
      const latestCore = latestProfile.profile;
      const latestAvatar = getAvatarUrl(latestCore.profilePicture);

      setValues(prev => ({
        ...prev,
        name: latestCore.name || prev.name,
        bio: latestCore.bio || prev.bio,
        githubUrl: latestCore.githubUrl || prev.githubUrl,
        linkedinUrl: latestCore.linkedinUrl || prev.linkedinUrl,
        resumeUrl: latestCore.resumeUrl || prev.resumeUrl,
        avatar: latestAvatar,
        skills: responseData.skills ?? prev.skills,
        techRoles: responseData.techRoles ?? prev.techRoles,
        intrestes: (
          responseData.intrestes ??
          responseData.interests ??
          prev.intrestes ??
          []
        ).filter(i => VALID_INTERESTS.has(i)),
        avatarFile: null,
      }));

      setUser(prev => ({
        ...prev,
        profilePicture: latestCore.profilePicture
      }));

      return responseData;
    } catch (err) {
      console.error("Error updating profile:", err);
      const msg = err.response?.data?.message || err.message || "Update failed.";
      setApiError(msg);
      throw err;
    }
  }, [values, setValues, setUser]);


  useEffect(() => {
    if (values.avatarFile instanceof File) {
      handleProfileUpdate({ avatarFile: values.avatarFile });
    }
  }, [values.avatarFile, handleProfileUpdate]);

  // When Loading
  if (isLoading) {
    return (
      <LoadingState message="Loading Profile" />
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
        interests={values.intrestes}
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