const prisma = require("../../config/prisma");

const findUserProfile = (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      skills: { 
        include: { skill: true } 
      },
      hackathonInterests: { 
        include: { hackathon: true } 
      },
      ownedProjects: true,
      ownedTeams: { 
        include: { hackathon: true } 
      },
      teamMemberships: { 
        include: { 
          team: { include: { hackathon: true } } 
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

const clearUserSkills = (userId) => {
  return prisma.userSkill.deleteMany({
    where: { userId }
  });
};

const upsertSkillByName = (name) => {
  return prisma.skill.upsert({
    where: { name },
    update: {}, 
    create: { name }
  });
};

const createUserSkillRelation = (userId, skillId) => {
  return prisma.userSkill.create({
    data: { userId, skillId }
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

const getUsersBasicList = async (currentUserId) => {
  return prisma.user.findMany({
    where: {
      isVerified: true,
       id: {
        not: currentUserId,
      },
    },
    select: {
      id: true,
      name: true,
      email: true
    },
    orderBy: {
      name: "asc"
    }
  });
};

module.exports = {
  findUserProfile,
  updateUser,
  clearUserSkills,
  upsertSkillByName,
  createUserSkillRelation,
  searchUsers,
  getUsersBasicList
};