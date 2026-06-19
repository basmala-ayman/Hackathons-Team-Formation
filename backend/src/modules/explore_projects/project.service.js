const projectRepository = require("./project.repository");
const AppError = require("../../utils/AppError");

const getAllExploreProjects = async () => {
  const projects = await projectRepository.exploreAllProjects();

  return projects.map((p) => ({
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
    isInterested: false
  }));
};

const registerProjectInterest = async (projectId, userId) => {
  const project = await projectRepository.findProjectById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.ownerId === userId) {
    throw new AppError(
      "You cannot express interest in your own project",
      400
    );
  }

  const existingRelation =
    await projectRepository.findInterestRelation(
      projectId,
      userId
    );

  if (existingRelation) {
    throw new AppError(
      "You have already registered interest for this project",
      409
    );
  }

  const updatedProject =
    await projectRepository.storeInterestOnUserRecord(
      projectId,
      userId
    );

  return {
    projectId: updatedProject.id,
    userId,
    totalInterestsCount: updatedProject.interestsCount,
    isInterested: true
  };
};

module.exports = {
  getAllExploreProjects,
  registerProjectInterest
};