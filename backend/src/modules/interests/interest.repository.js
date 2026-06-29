const prisma = require("../../config/prisma");

// ── Hackathon Interest ────────────────────────────────────

const findHackathonInterest = (userId, hackathonId) => {
    return prisma.hackathonInterest.findUnique({
        where: { userId_hackathonId: { userId, hackathonId } },
    });
};

const createHackathonInterest = (userId, hackathonId) => {
    return prisma.hackathonInterest.create({
        data: { userId, hackathonId },
    });
};

const deleteHackathonInterest = (userId, hackathonId) => {
    return prisma.hackathonInterest.delete({
        where: { userId_hackathonId: { userId, hackathonId } },
    });
};

// returns updated hackathon so service reads new count from it directly
const incrementHackathonInterestCount = (hackathonId) => {
    return prisma.hackathon.update({
        where: { id: hackathonId },
        data: { interestCount: { increment: 1 } },
        select: { interestCount: true },
    });
};

const decrementHackathonInterestCount = (hackathonId) => {
    return prisma.hackathon.update({
        where: { id: hackathonId },
        data: { interestCount: { decrement: 1 } },
        select: { interestCount: true },
    });
};


//this function will be used when we reach the max to send them in the ai model
const getHackathonCandidatePool = (hackathonId) => {
    return prisma.hackathonInterest.findMany({
        where: { hackathonId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    techRole: true,
                    skills: {
                        include: { skill: { select: { name: true } } },
                    },
                },
            },
        },
    });
};

// ── Project Interest ──────────────────────────────────────

const findProjectInterest = (userId, projectId) => {
    return prisma.projectInterest.findUnique({
        where: { userId_projectId: { userId, projectId } },
    });
};

const createProjectInterest = (userId, projectId) => {
    return prisma.projectInterest.create({
        data: { userId, projectId },
    });
};

const deleteProjectInterest = (userId, projectId) => {
    return prisma.projectInterest.delete({
        where: { userId_projectId: { userId, projectId } },
    });
};

// same pattern as hackathon — returns updated project so no second query needed
const incrementProjectInterestCount = (projectId) => {
    return prisma.project.update({
        where: { id: projectId },
        data: { interestsCount: { increment: 1 } },
        select: { interestsCount: true },
    });
};

const decrementProjectInterestCount = (projectId) => {
    return prisma.project.update({
        where: { id: projectId },
        data: { interestsCount: { decrement: 1 } },
        select: { interestsCount: true },
    });
};

const getProjectCandidatePool = (projectId) => {
    return prisma.projectInterest.findMany({
        where: { projectId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    techRole: true,
                    skills: {
                        include: { skill: { select: { name: true } } },
                    },
                },
            },
        },
    });
};

// ── Mutual exclusion checks ───────────────────────────────

//this to check if the user making team for this hackathon he made interested on it
const findUserTeamForHackathon = (userId, hackathonId) => {
    return prisma.team.findFirst({
        where: { ownerId: userId, hackathonId },
    });
};

//to check if the user is interested before for the hackathon before orno 
const findHackathonInterestByUser = (userId, hackathonId) => {
    return prisma.hackathonInterest.findUnique({
        where: { userId_hackathonId: { userId, hackathonId } },
    });
};

const findProject = (projectId) => {
    return prisma.project.findUnique({
        where: { id: projectId },
    });
};

module.exports = {
    findHackathonInterest,
    createHackathonInterest,
    deleteHackathonInterest,
    incrementHackathonInterestCount,
    decrementHackathonInterestCount,
    getHackathonCandidatePool,
    findProjectInterest,
    createProjectInterest,
    deleteProjectInterest,
    incrementProjectInterestCount,
    decrementProjectInterestCount,
    getProjectCandidatePool,
    findUserTeamForHackathon,
    findHackathonInterestByUser,
    findProject,
};