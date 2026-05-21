const prisma = require("../../config/prisma");

const findUserProfile = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      skills: {
        include: { skill: true }
      },
      hackathonInterests: {
        include: { hackathon: true }
      },
      ownedProjects: {
        include: {
          team: {
            include: {
              members: true 
            }
          },
          interests: true 
        }
      }
    }
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data
  });
};

const clearUserSkills = async (userId) => {
  return prisma.userSkill.deleteMany({ where: { userId } });
};

const upsertSkillByName = async (name) => {
  return prisma.skill.upsert({
    where: { name },
    update: {},
    create: { name }
  });
};

const createUserSkillRelation = async (userId, skillId) => {
  return prisma.userSkill.create({
    data: {
      userId,
      skillId
    }
  });
};

const clearHackathonInterests = async (userId) => {
  return prisma.hackathonInterest.deleteMany({ where: { userId } });
};

const findHackathonByTitle = async (title) => {
  return prisma.hackathon.findFirst({
    where: {
      title: { equals: title, mode: "insensitive" }
    }
  });
};

const createHackathonInterest = async (userId, hackathonId, name) => {
  return prisma.hackathonInterest.create({
    data: {
      userId,
      hackathonId,
      name
    }
  });
};

const getUsersBasicList = async (currentUserId) => {
  return prisma.user.findMany({
    where: {
      id: { not: currentUserId }
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

const searchUsers = async (query, excludeUserId) => {
  return prisma.user.findMany({
    where: {
      id: { not: excludeUserId },
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } }
      ]
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true
    },
    take: 10
  });
};

const getUserHackathonInterests = async (userId) => {
  return prisma.hackathonInterest.findMany({
    where: { userId },
    include: { hackathon: true }
  });
};

module.exports = {
  findUserProfile,
  updateUser,
  clearUserSkills,
  upsertSkillByName,
  createUserSkillRelation,
  clearHackathonInterests,
  findHackathonByTitle,
  createHackathonInterest,
  getUsersBasicList,
  searchUsers,
  getUserHackathonInterests
};