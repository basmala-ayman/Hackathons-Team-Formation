// user.service.js

const userRepository = require("./user.repository");
const AppError = require("../../utils/AppError");


const resolveInternalUserId = async (uuidOrId) => {
  if (!isNaN(uuidOrId)) {
    return parseInt(uuidOrId, 10);
  }

  const user = await userRepository.findUserProfile(uuidOrId);
  if (!user) {
    throw new AppError("User account not found", 404);
  }
  
  return user.id; 
};

const getProfile = async (id) => {
  const user = await userRepository.findUserProfile(id);

  if (!user || user.deletedAt) {
    throw new AppError("User not found or account deactivated", 404);
  }

  const skills = user.skills?.map((s) => s.skill.name) || [];

  const hackathonInterests = user.hackathonInterests?.map((hi) => {
    if (hi.hackathon) {
      return {
        id: hi.hackathon.id,
        title: hi.hackathon.title,
        thumbnailUrl: hi.hackathon.thumbnailUrl,
        location: hi.hackathon.location,
        status: hi.hackathon.status
      };
    }
    return {
      id: hi.hackathonId || null,
      title: hi.name || "Unknown Hackathon",
      thumbnailUrl: null,
      location: "Unknown",
      status: "UNKNOWN"
    };
  }) || [];

  const featuredProjects = user.ownedProjects?.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    interestsCount: p.interestsCount
  })) || [];

  const hackathonHistory = [
    ...(user.ownedTeams?.map((t) => ({
      title: t.hackathon?.title || "Unknown Hackathon",
      role: "OWNER",
      status: t.status
    })) || []),

    ...(user.teamMemberships?.map((m) => ({
      title: m.team.hackathon?.title || "Unknown Hackathon",
      role: "MEMBER",
      status: m.team.status
    })) || [])
  ];

  const step1Complete = !!user.bio && skills.length > 0;
  const step2Complete = hackathonInterests.length > 0;
  const step3Complete = featuredProjects.length > 0;
  const step4Complete = !!user.resumeUrl && !!user.linkedinUrl && !!user.githubUrl;

  let percentage = 0;
  if (step1Complete) percentage += 25;
  if (step2Complete) percentage += 25;
  if (step3Complete) percentage += 25;
  if (step4Complete) percentage += 25;

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
      techRoles: user.techRoles || [] 
    },
    skills,
    hackathonInterests,
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

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  if (data.techRole && !data.techRoles) {
    data.techRoles = Array.isArray(data.techRole) ? data.techRole : [data.techRole];
    delete data.techRole;
  }

  const numericUserId = await resolveInternalUserId(id);

  if (data.hardSkills || data.softSkills) {
    await userRepository.clearUserSkills(numericUserId);

    const allSkills = [
      ...(data.hardSkills || []),
      ...(data.softSkills || [])
    ];

    for (const name of allSkills) {
      if (!name.trim()) continue;

      const skill = await userRepository.upsertSkillByName(name.trim());
      await userRepository.createUserSkillRelation(numericUserId, skill.id);
    }

    delete data.hardSkills;
    delete data.softSkills;
  }

  if (data.hackathonInterests) {
    await userRepository.clearHackathonInterests(numericUserId);

    const interests = Array.isArray(data.hackathonInterests)
      ? data.hackathonInterests
      : [data.hackathonInterests];

    for (const title of interests) {
      if (!title || !title.trim()) continue;
      
      const hackathon = await userRepository.findHackathonByTitle(title.trim());
      
      if (hackathon) {
        await userRepository.createHackathonInterest(numericUserId, hackathon.id);
      }
    }

    delete data.hackathonInterests;
  }

  await userRepository.updateUser(id, data);
  return getProfile(id);
};

const searchUsers = async (query, currentUserId) => {
  if (!query || query.trim() === "") return [];
  return userRepository.searchUsers(query.trim(), currentUserId);
};

const getUsersBasicList = async (currentUserId) => {
  const users = await userRepository.getUsersBasicList(currentUserId);
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