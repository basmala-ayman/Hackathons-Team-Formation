// project.repository.js
const prisma = require("../../config/prisma");

const exploreAllProjects = async () => {
  return prisma.project.findMany({
    include: {
      owner: {
        select: { name: true, profilePicture: true }
      },
      team: {
        select: { name: true, status: true, roles: true, members: true }
      },
      interests: {
        select: { userId: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

const findProjectById = async (id) => {
  return prisma.project.findUnique({ where: { id } });
};

const findInterestRelation = async (projectId, userId) => {
  return prisma.projectInterest.findUnique({
    where: {
      userId_projectId: { userId, projectId }
    }
  });
};

const storeInterestOnUserRecord = async (projectId, userId) => {
  return prisma.$transaction(async (tx) => {
    
    // Updates the User record row by adding a line inside the child relation schema array
    await tx.user.update({
      where: { id: userId },
      data: {
        projectInterests: {
          create: {
            projectId: projectId
          }
        }
      }
    });

    // Simultaneously increment scalar metadata values on parent project context
    return tx.project.update({
      where: { id: projectId },
      data: {
        interestsCount: { increment: 1 }
      }
    });
  });
};

module.exports = {
  exploreAllProjects,
  findProjectById,
  findInterestRelation,
  storeInterestOnUserRecord
};