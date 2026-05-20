// user.service.js

const userRepository = require("./user.repository");
const AppError = require("../../utils/AppError");

const getProfile = async (id) => {
  const user = await userRepository.findUserProfile(id);

  if (!user || user.deletedAt) {
    throw new AppError("User not found or account deactivated", 404);
  }

  // all skills
  const skills =
    user.skills?.map((s) => s.skill.name) || [];

  // hackathons
  const interestedHackathons =
    user.hackathonInterests?.map((hi) => ({
      id: hi.hackathon.id,
      title: hi.hackathon.title,
      thumbnailUrl: hi.hackathon.thumbnailUrl,
      location: hi.hackathon.location,
      status: hi.hackathon.status
    })) || [];

  // projects
  const featuredProjects =
    user.ownedProjects?.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      interestsCount: p.interestsCount
    })) || [];

  // history
  const hackathonHistory = [
    ...(user.ownedTeams?.map((t) => ({
      title: t.hackathon?.title,
      role: "OWNER",
      status: t.status
    })) || []),

    ...(user.teamMemberships?.map((m) => ({
      title: m.team.hackathon?.title,
      role: "MEMBER",
      status: m.team.status
    })) || [])
  ];

  // completion steps
  const step1Complete =
    !!user.bio && skills.length > 0;

  const step2Complete =
    interestedHackathons.length > 0;

  const step3Complete =
    featuredProjects.length > 0;

  const step4Complete =
    !!user.resumeUrl &&
    !!user.linkedinUrl &&
    !!user.githubUrl;

  // percentage
  let percentage = 0;

  if (step1Complete) percentage += 25;
  if (step2Complete) percentage += 25;
  if (step3Complete) percentage += 25;
  if (step4Complete) percentage += 25;

  // popup step
  let targetModalPopupStep = null;

  if (!step1Complete) targetModalPopupStep = 1;
  else if (!step2Complete) targetModalPopupStep = 2;
  else if (!step3Complete) targetModalPopupStep = 3;
  else if (!step4Complete) targetModalPopupStep = 4;

  return {
    id: user.id,

    profileCompletionPercentage: percentage,

    targetModalPopupStep,

    isProfileComplete: percentage === 100,

    profile: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      githubUrl: user.githubUrl,
      linkedinUrl: user.linkedinUrl,
      resumeUrl: user.resumeUrl,
      techRole: user.techRole
    },

    skills,

    interestedHackathons,

    featuredProjects,

    hackathonHistory
  };
};

const updateProfile = async (id, data) => {
  const forbiddenFields = [
    "id",
    "role",
    "password",
    "isVerified",
    "email",
    "createdAt",
    "updatedAt"
  ];

  forbiddenFields.forEach((field) => delete data[field]);

  // remove undefined
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  // update skills
  if (data.hardSkills || data.softSkills) {
    await userRepository.clearUserSkills(id);

    const allSkills = [
      ...(data.hardSkills || []),
      ...(data.softSkills || [])
    ];

    for (const name of allSkills) {
      if (!name.trim()) continue;

      const skill =
        await userRepository.upsertSkillByName(name.trim());

      await userRepository.createUserSkillRelation(
        id,
        skill.id
      );
    }

    delete data.hardSkills;
    delete data.softSkills;
  }

  await userRepository.updateUser(id, data);

  return getProfile(id);
};

const searchUsers = async (query, currentUserId) => {
  if (!query || query.trim() === "") return [];

  return userRepository.searchUsers(
    query.trim(),
    currentUserId
  );
};

const getUsersBasicList = async (currentUserId) => {
  const users =
    await userRepository.getUsersBasicList(currentUserId);

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
  getUsersBasicList
};