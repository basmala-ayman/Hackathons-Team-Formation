// src/modules/team/team.repository.js
const prisma = require("../../config/prisma");


const upsertSkill = async (name) => {
  return prisma.skill.upsert({
    where: { name },
    update: {},
    create: { name },
  });
};

//this data hasing the required skills the user entered in the front end and the required roles too 
const createTeam = async (data) => {
  return prisma.team.create({
    data,
  });
};

//this when the user invite person so it make it as team member 
const addTeamMember = async (data) => {
  return prisma.teamMember.create({
    data,
  });
};

//this cause to adding the members that was already invited and get their skills to be added here 
const addTeamSkills = async (teamSkillsData) => {
  return prisma.teamSkill.createMany({
    data: teamSkillsData,
    skipDuplicates: true,
  });
};

//this will taking all the members that the user want to invite them and making invitations to them all in the same time 
const createInvitations = async (data) => {
  return Promise.all(
    data.map((invitation) =>
      prisma.teamInvitation.create({
        data: invitation,
      })
    )
  );
};

//now here we want to add the project things in the repositry too
const createProject = (data) => {
  return prisma.project.create({ data });
};

const findInvitationById = async (invitationId) => {
  return prisma.teamInvitation.findUnique({
    where: {
      id: invitationId,
    },
    include: {
      team: true,
    },
  });
};

const updateInvitationStatus = async (
  invitationId,
  status
) => {
  return prisma.teamInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      status,
    },
  });
};

const findUserTeamForHackathon = async (userId, hackathonId) => {
  return prisma.team.findFirst({
    where: {
      hackathonId,
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } }
      ]
    }
  });
};


const findMyTeamsWithMembers = async (userId) => {
  return prisma.team.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      hackathon: {
        select: { id: true, title: true, status: true },
      },
      project: {
        select: { id: true, title: true },
      },
      skills: {
        include: { skill: { select: { name: true } } },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
              techRoles: true,
              githubUrl: true,
              linkedinUrl: true,
              skills: {
                include: { skill: { select: { name: true } } },
              },
            },
          },
        },
      },
      invitations: {
        include: {
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
              techRoles: true,
              githubUrl: true,
              linkedinUrl: true,
              skills: {
                    include: { skill: { select: { name: true } } },
                },
            },
          },
        },
      },
    },
  });
};

module.exports = {
  upsertSkill,
  createTeam,
  addTeamMember,
  addTeamSkills,
  createInvitations,
  createProject,

  findInvitationById,
  updateInvitationStatus,
  findUserTeamForHackathon,
  findMyTeamsWithMembers
};