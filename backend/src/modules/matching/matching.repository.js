const prisma = require("../../config/prisma");
// ── MatchingRequest ───────────────────────────────────────

const createMatchingRequest = (data) => {
    return prisma.matchingRequest.create({ data });
};

const updateMatchingRequestStatus = (id, status) => {
    return prisma.matchingRequest.update({
        where: { id },
        data: { status, updatedAt: new Date() },
    });
};

const findLastMatchingRequestForTeam = (teamId) => {
    return prisma.matchingRequest.findFirst({
        where: { teamId },
        orderBy: { roundNumber: "desc" },
    });
};

// ── Teams queue for Case 2 ────────────────────────────────

const findTeamsQueueByHackathon = (hackathonId) => {
    return prisma.team.findMany({
        where: {
            hackathonId,
            status: "FORMING",
            project: null,   
            matchingRequests: {
                none: {
                    status: { in: ["COMPLETED", "PROCESSING"] },
                    projectId: null,
                },
            },
        },
        orderBy: { createdAt: "asc" },
        include: {
            skills: { include: { skill: { select: { name: true } } } },
            members: { select: { userId: true } },
        },
    });
};

const findHackathonsReadyForMatching = (threshold) => {
    return prisma.hackathon.findMany({
        where: {
            interestCount: { gte: threshold },
            status: { not: "ENDED" },
            teams: {
                some: {
                    status: "FORMING",
                    matchingRequests: {
                        none: {
                            status: { in: ["COMPLETED", "PROCESSING"] },
                            projectId: null,
                        },
                    },
                },
            }
        },
    });
};

// ── Project ───────────────────────────────────────────────

const findProjectWithTeam = (projectId) => {
    return prisma.project.findUnique({
        where: { id: projectId },
        include: {
            team: {
                include: {
                    skills: { include: { skill: { select: { name: true } } } },
                    members: { select: { userId: true } },
                },
            },
        },
    });
};

// ── AIRecommendation ──────────────────────────────────────

// createMany does not return rows in prisma so we create one by one to get IDs
const createRecommendations = async (recommendationsData) => {
    const created = [];
    for (const data of recommendationsData) {
        const rec = await prisma.aIRecommendation.create({ data });
        created.push(rec);
    }
    return created;
};

const createRecommendationMembers = (membersData) => {
    return prisma.aIRecommendationMember.createMany({
        data: membersData,
        skipDuplicates: true,
    });
};

// ── Invitations ───────────────────────────────────────────

const createInvitations = (data) => {
    return prisma.teamInvitation.createMany({
        data,
        skipDuplicates: true,
    });
};

// ── Team ──────────────────────────────────────────────────

const findTeamById = (teamId) => {
    return prisma.team.findUnique({
        where: { id: teamId },
        include: {
            skills: { include: { skill: { select: { name: true } } } },
            members: { select: { userId: true } },
        },
    });
};

const updateTeamStatus = (teamId, status) => {
    return prisma.team.update({ where: { id: teamId }, data: { status } });
};

const countTeamMembers = (teamId) => {
    return prisma.teamMember.count({ where: { teamId } });
};

// ── Round 2 helpers ───────────────────────────────────────

const findAcceptedRecommendationMembers = (teamId) => {
    return prisma.aIRecommendationMember.findMany({
        where: {
            status: "ACCEPTED",
            recommendation: { matchingRequest: { teamId } },
        },
        select: { userId: true },
    });
};

const findAllRecommendedUserIdsForTeam = (teamId) => {
    return prisma.aIRecommendationMember.findMany({
        where: {
            recommendation: { matchingRequest: { teamId } },
        },
        select: { userId: true },
        distinct: ["userId"],
    });
};

// ── Cron helpers ──────────────────────────────────────────

const markExpiredInvitations = () => {
    return prisma.teamInvitation.updateMany({
        where: { status: "PENDING", deadline: { lt: new Date() } },
        data: { status: "EXPIRED" },
    });
};

const findFormingTeamsWithNoOpenInvitations = () => {
    return prisma.team.findMany({
        where: {
            status: "FORMING",
            invitations: { none: { status: "PENDING" } },
        },
        include: {
            members: { select: { userId: true } },
            owner: { select: { id: true } },
        },
    });
};


const findRejectedRecommendationMembers = (teamId) => {
    return prisma.aIRecommendationMember.findMany({
        where: {
            status: { in: ["REJECTED", "EXPIRED"] },
            recommendation: { matchingRequest: { teamId } },
        },
        select: { userId: true },
        distinct: ["userId"],
    });
};



module.exports = {
    createMatchingRequest,
    updateMatchingRequestStatus,
    findLastMatchingRequestForTeam,
    findTeamsQueueByHackathon,
    findHackathonsReadyForMatching,
    findProjectWithTeam,
    createRecommendations,
    createRecommendationMembers,
    createInvitations,
    findTeamById,
    updateTeamStatus,
    countTeamMembers,
    findAcceptedRecommendationMembers,
    findAllRecommendedUserIdsForTeam,
    markExpiredInvitations,
    findFormingTeamsWithNoOpenInvitations,
    findRejectedRecommendationMembers,
};