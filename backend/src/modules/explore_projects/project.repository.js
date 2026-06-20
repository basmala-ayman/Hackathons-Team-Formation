const prisma = require("../../config/prisma");

const exploreAllProjects = async () => {
  return prisma.project.findMany({
    include: {
      owner: {
        select: {
          name: true,
          profilePicture: true,
          role: true
        }
      },

    team: {
        include: {
          hackathon: { 
            select: {
              id: true,
              title: true,
              status: true
            }
          },
          members: true,
          skills: {
            include: {
              skill: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      },

      interests: {
        select: {
          userId: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};



const findInterestRelation = async (projectId, userId) => {
  return prisma.projectInterest.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId
      }
    }
  });
};

const storeInterestOnUserRecord = async (projectId, userId) => {
  return prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        projectInterests: {
          create: { projectId }
        }
      }
    });

    return tx.project.update({
      where: { id: projectId },
      data: {
        interestsCount: {
          increment: 1
        }
      }
    });
  });
};

module.exports = {
  exploreAllProjects,
  findInterestRelation,
  storeInterestOnUserRecord
};