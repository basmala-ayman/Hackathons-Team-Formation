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
                        select: { id: true, name: true, profilePicture: true, techRoles: true },
                    },
                },
            },
            matchingRequests: {
                orderBy: { roundNumber: "desc" },
                take: 1,
                include: {
                    recommendations: {
                        orderBy: { createdAt: "asc" },

                        include: {

                            airecommendationMembers: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            profilePicture: true,
                                            techRoles: true,
                                        },
                                    },
                                },
                            },

                            // invitations: {
                            //     select: {
                            //         id: true,
                            //         receiverId: true,
                            //         status: true,
                            //     },
                            // },
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
                                select: { id: true, name: true, profilePicture: true, techRoles: true },
                            },
                        },
                    },
                },

            },
            recommendationMember: {   
                select: { recommendationId: true },
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
        where: { recommendationId_userId: { recommendationId, userId } },
        data: { status },
    });
};

const findMemberRecommendation = (userId, teamId) => {
    return prisma.aIRecommendationMember.findFirst({
        where: {
            userId,
            recommendation: {
                status: "ACCEPTED",
                matchingRequest: { teamId },
            },
        },
        select: { recommendationId: true },
    });
};

// ── Invitations ───────────────────────────────────────────

const createInvitations = (data) => {
    return prisma.teamInvitation.createMany({ data, skipDuplicates: true });
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

const findAcceptedInvitationForHackathon = (userId, hackathonId) => {
    return prisma.teamInvitation.findFirst({
        where: { receiverId: userId, status: "ACCEPTED", team: { hackathonId } },
    });
};

// ── Team ──────────────────────────────────────────────────

const addTeamMember = (data) => prisma.teamMember.create({ data });
const countTeamMembers = (teamId) => prisma.teamMember.count({ where: { teamId } });
const updateTeamStatus = (teamId, status) => prisma.team.update({ where: { id: teamId }, data: { status } });
const findTeamById = (teamId) => prisma.team.findUnique({
    where: { id: teamId },
    select: { id: true, name: true, ownerId: true, size: true, hackathonId: true },
});




// now i will need to return back the information about the view team things but rather than sending it in the same endpoint of the sending the recommended teams
//it will be better to send them in a seperate function to not making the load in the network very high and to make the things more faster
const findRecommendationFullDetails = (id) => {
    return prisma.aIRecommendation.findUnique({
        where: { id },
        include: {
            matchingRequest: {
                include: {
                    team: {
                        include: {
                            hackathon: true,
                            skills: {
                                include: {
                                    skill: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            airecommendationMembers: {
                select: {
                    invitationId: true,
                    status: true,

                    user: {
                        select: {
                            id: true,
                            name: true,
                            bio: true,
                            profilePicture: true,
                            techRoles: true,

                            skills: {
                                include: {
                                    skill: {
                                        select: {
                                            name: true,
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
    findRecommendationFullDetails,
};