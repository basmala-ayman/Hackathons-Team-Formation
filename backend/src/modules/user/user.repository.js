const prisma = require("../../config/prisma");

const findUserProfile = (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      skills: { include: { skill: true } },
      ownedTeams: {
        include: {
          hackathon: true,
          members: true
        }
      },
      teamMemberships: {
        include: {
          team: {
            include: {
              hackathon: true
            }
          }
        }
      },
      sentInvitations: {
        include: {
          team: true,
          receiver: true
        }
      },
      receivedInvitations: {
        include: {
          team: true,
          sender: true
        }
      },
      matchingRequests: {
        include: {
          hackathon: true
        }
      }
    }
  });
};

const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id },
    data
  });
};



const searchUsers = async (query, excludeUserId) => {
  return prisma.user.findMany({
    where: {
      AND: [
        { id: { not: excludeUserId } },
        { deletedAt: null },
        {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true,
    },
    take: 10,
  });
};


module.exports = {
  findUserProfile,
  updateUser,
  searchUsers,
};