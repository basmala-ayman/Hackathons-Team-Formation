// project.repository.js
const prisma = require("../../config/prisma");

const exploreAllProjects = async () => {
  return prisma.project.findMany({
    include: {
      owner: {
        select: { name: true, profilePicture: true }
      },
      team: {
        include: { members: true }
      },
      interests: true // Safely reads relation table if present
    },
    orderBy: { createdAt: "desc" }
  });
};

const findProjectById = async (projectId) => {
  return prisma.project.findUnique({
    where: { id: projectId }
  });
};

const incrementCounter = async (projectId) => {
  // Uses Prisma atomic update operation
  return prisma.project.update({
    where: { id: projectId },
    data: {
      // If you have a specific field name change this to your column counter property key
      interestsCount: { increment: 1 } 
    },
    include: {
      interests: true
    }
  });
};

module.exports = {
  exploreAllProjects,
  findProjectById,
  incrementCounter
};