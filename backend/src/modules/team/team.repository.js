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
const createInvitations = async (invitationsData) => {
  return prisma.teamInvitation.createMany({
    data: invitationsData,
  });
};

//now here we want to add the project things in the repositry too
const createProject = (data) => {
  return prisma.project.create({ data });
};


module.exports = {
  upsertSkill,
  createTeam,
  addTeamMember,
  addTeamSkills,
  createInvitations,
  createProject,
};