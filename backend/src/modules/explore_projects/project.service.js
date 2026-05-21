// project.service.js
const projectRepository = require("./project.repository");
const AppError = require("../../utils/AppError");

const getAllExploreProjects = async (authUserId) => {
  const projects = await projectRepository.exploreAllProjects();

  return projects.map((p) => {
    // Returns true if current logged in user has an active relation entry
    const isInterested = p.interests.some((interest) => interest.userId === authUserId);

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      createdAt: p.createdAt,
      creatorId: p.ownerId,
      creatorName: p.owner?.name || "Unknown",
      creatorPicture: p.owner?.profilePicture || null,
      teamId: p.teamId,
      teamName: p.team?.name || null,
      teamStatus: p.team?.status || null,
      requiredSkillsOrRoles: p.team?.roles || [],
      totalTeamMembersCount: p.team?.members?.length || 0,
      totalInterestsCount: p.interestsCount,
      isInterested
    };
  });
};

const registerProjectInterest = async (projectId, userId) => {
  const project = await projectRepository.findProjectById(projectId);
  if (!project) throw new AppError("Project not found", 404);

  // Prevent creators from signing up for their own projects
  if (project.ownerId === userId) {
    throw new AppError("You cannot express interest in your own project", 400);
  }

  // Prevent duplicate interactions
  const existingRelation = await projectRepository.findInterestRelation(projectId, userId);
  if (existingRelation) {
    throw new AppError("You have already registered interest for this project", 409);
  }

  // Updates user relationship and increments counter column atomically
  const updatedProject = await projectRepository.storeInterestOnUserRecord(projectId, userId);

  return {
    projectId: updatedProject.id,
    userId: userId,
    totalInterestsCount: updatedProject.interestsCount,
    isInterested: true
  };
};

module.exports = {
  getAllExploreProjects,
  registerProjectInterest
};