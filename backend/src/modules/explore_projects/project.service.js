// project.service.js
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
    
    // Fallback reading: pulls relation table length or a raw counter property if it exists
    totalInterestsCount: p.interests?.length || p.interestsCount || 0
  }));
};

const incrementProjectInterest = async (projectId) => {
  const projectExists = await projectRepository.findProjectById(projectId);
  if (!projectExists) throw new AppError("Project not found", 404);

  // Increments the count structural metrics safely inside the database
  const updatedProject = await projectRepository.incrementCounter(projectId);

  return {
    projectId: updatedProject.id,
    totalInterestsCount: updatedProject.interests?.length || updatedProject.interestsCount || 0
  };
};

module.exports = {
  getAllExploreProjects,
  incrementProjectInterest
};