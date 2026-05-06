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

module.exports = {
  findUserProfile,
  updateUser
};