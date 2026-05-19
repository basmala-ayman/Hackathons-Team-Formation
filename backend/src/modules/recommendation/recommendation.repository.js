const prisma = require("../../config/prisma");
// ── My Teams tab ──────────────────────────────────────────

const findOwnerTeamsWithRecommendations = (userId) => {
    return prisma.team.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
        include: {
            hackathon: { select: { id: true, title: true, status: true } },
            skills: { include: { skill: { select: { name: true } } } },
            members: {
                include: {
                    user: {
                        select: { id: true, name: true, profilePicture: true, techRole: true },
                    },
                },
            },
            matchingRequests: {
                orderBy: { roundNumber: "desc" },
                take: 1,
                include: {
                    recommendations: {
                        orderBy: { compatibilityScore: "desc" },
                        include: {
                            // get queryable member rows with their invitation status
                            airecommendationMembers: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            profilePicture: true,
                                            techRole: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

// ── Join tab ──────────────────────────────────────────────

const findReceivedInvitations = (userId) => {
    return prisma.teamInvitation.findMany({
        where: { receiverId: userId },
        orderBy: { createdAt: "desc" },
        include: {
            team: {
                include: {
                    hackathon: { select: { id: true, title: true } },
                    owner: { select: { id: true, name: true, profilePicture: true } },
                    skills: { include: { skill: { select: { name: true } } } },
                    members: {
                        include: {
                            user: {
                                select: { id: true, name: true, profilePicture: true, techRole: true },
                            },
                        },
                    },
                },
            },
        },
    });
};

// ── Single recommendation ─────────────────────────────────

const findRecommendationById = (id) => {
    return prisma.aIRecommendation.findUnique({
        where: { id },
        include: {
            matchingRequest: {
                include: {
                    team: true,
                    hackathon: { select: { title: true } },
                },
            },
            airecommendationMembers: { select: { userId: true } },
        },
    });
};

const updateRecommendationStatus = (id, status, expiresAt) => {
    return prisma.aIRecommendation.update({
        where: { id },
        data: { status, ...(expiresAt && { expiresAt }) },
    });
};

// when founder accepts one, auto-reject the other two
const rejectOtherRecommendations = (matchingRequestId, acceptedId) => {
    return prisma.aIRecommendation.updateMany({
        where: {
            matchingRequestId,
            id: { not: acceptedId },
            status: "PENDING",
        },
        data: { status: "REJECTED" },
    });
};

// ── AIRecommendationMember ────────────────────────────────

const updateRecommendationMemberStatus = (recommendationId, userId, status) => {
    return prisma.aIRecommendationMember.update({
        where: {
            recommendationId_userId: { recommendationId, userId },
        },
        data: { status },
    });
};

// find which recommendation this user belongs to for a given team
const findMemberRecommendation = (userId, teamId) => {
    return prisma.aIRecommendationMember.findFirst({
        where: {
            userId,
            recommendation: {
                status: "ACCEPTED", // only from accepted recommendations
                matchingRequest: { teamId },
            },
        },
        select: { recommendationId: true },
    });
};

// ── Invitations ───────────────────────────────────────────

const createInvitations = (data) => {
    return prisma.teamInvitation.createMany({
        data,
        skipDuplicates: true,
    });
};

const findInvitationById = (id) => {
    return prisma.teamInvitation.findUnique({
        where: { id },
        include: {
            team: {
                include: {
                    hackathon: { select: { id: true, title: true } },
                    owner: { select: { id: true, name: true } },
                },
            },
        },
    });
};

const updateInvitationStatus = (id, status) => {
    return prisma.teamInvitation.update({
        where: { id },
        data: { status, updatedAt: new Date() },
    });
};

// enforce: cannot accept more than one team per hackathon
const findAcceptedInvitationForHackathon = (userId, hackathonId) => {
    return prisma.teamInvitation.findFirst({
        where: {
            receiverId: userId,
            status: "ACCEPTED",
            team: { hackathonId },
        },
    });
};

// ── Team ──────────────────────────────────────────────────

const addTeamMember = (data) => {
    return prisma.teamMember.create({ data });
};

const countTeamMembers = (teamId) => {
    return prisma.teamMember.count({ where: { teamId } });
};

const updateTeamStatus = (teamId, status) => {
    return prisma.team.update({ where: { id: teamId }, data: { status } });
};

const findTeamById = (teamId) => {
    return prisma.team.findUnique({
        where: { id: teamId },
        select: { id: true, name: true, ownerId: true, size: true, hackathonId: true },
    });
};

module.exports = {
    findOwnerTeamsWithRecommendations,
    findReceivedInvitations,
    findRecommendationById,
    updateRecommendationStatus,
    rejectOtherRecommendations,
    updateRecommendationMemberStatus,
    findMemberRecommendation,
    createInvitations,
    findInvitationById,
    updateInvitationStatus,
    findAcceptedInvitationForHackathon,
    addTeamMember,
    countTeamMembers,
    updateTeamStatus,
    findTeamById,
};