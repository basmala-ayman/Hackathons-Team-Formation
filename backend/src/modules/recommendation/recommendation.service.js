const recommendationRepository = require("./recommendation.repository");
const notificationRepository = require("../notifications/notification.repository");
const AppError = require("../../utils/AppError");

// ─────────────────────────────────────────────────────────
// GET — "My Teams" tab
// Shape matches what frontend expects from the images:
// teamName, hackathonName, matchLevel, maxMembers,
// members: [{ name, role, tags }]
// ─────────────────────────────────────────────────────────
const getMyTeamsTab = async (userId) => {
    const teams = await recommendationRepository.findOwnerTeamsWithRecommendations(userId);


     console.log(
        "airecommendationMembers:",
        JSON.stringify(
            teams[0]?.matchingRequests[0]?.recommendations[0]?.airecommendationMembers,
            null,
            2
        )
    );


        return teams.map((team) => {
            const latestRequest = team.matchingRequests[0] || null;

            const recommendations = latestRequest
                ? latestRequest.recommendations.map((rec) => {
                    // teamData already has enriched members stored as snapshot
                    const snapshotMembers = rec.teamData?.members || [];

                    // merge snapshot data with live invitation status from AIRecommendationMember
                    const members = rec.airecommendationMembers.map((m) => {
                        const snapshot = snapshotMembers.find((s) => s.userId === m.user.id) || {};

                        return {
                            userId: m.user.id,
                            name: m.user.name,
                            profilePicture: m.user.profilePicture,
                            role: m.user.techRoles || snapshot.role || "",
                            tags: snapshot.tags || [],
                            invitationStatus: m.status,
                        };
                    });



                    const accepted = members.filter((m) => m.invitationStatus === "ACCEPTED").length;
                    const rejected = members.filter((m) => ["REJECTED", "EXPIRED"].includes(m.invitationStatus)).length;
                    const pending = members.filter((m) => m.invitationStatus === "PENDING").length;

                    return {
                        id: rec.id,
                        matchLevel: rec.teamData?.matchLevel || "Medium",
                        status: rec.status,
                        expiresAt: rec.expiresAt,
                        members,
                        progress: {
                            total: members.length,
                            accepted,
                            rejected,
                            pending,
                            acceptedPercent: members.length > 0
                                ? Math.round((accepted / members.length) * 100)
                                : 0,
                        },
                    };
                })
                : [];

            return {
                teamId: team.id,
                teamName: team.name,
                hackathonName: team.hackathon.title,
                description: team.description || "",
                status: team.status,
                maxMembers: team.size,
                ownerId: team.ownerId,
                hackathon: team.hackathon,
                requiredSkills: team.skills.map((s) => s.skill.name),
                currentMembers: team.members.map((m) => ({
                    userId: m.user.id,
                    name: m.user.name,
                    profilePicture: m.user.profilePicture,
                    role: m.user.techRoles || "",
                })),
                matchingRound: latestRequest ? latestRequest.roundNumber : 0,
                matchingStatus: latestRequest ? latestRequest.status : null,
                recommendations,
            };
        });
    };

    // ─────────────────────────────────────────────────────────
    // GET — "Join" tab
    // ─────────────────────────────────────────────────────────
    const getJoinTab = async (userId) => {
        const invitations = await recommendationRepository.findReceivedInvitations(userId);

        return invitations.map((inv) => ({
            invitationId: inv.id,
            status: inv.status,
            deadline: inv.deadline,
            team: {
                id: inv.team.id,
                teamName: inv.team.name,
                hackathonName: inv.team.hackathon.title,
                description: inv.team.description || "",
                maxMembers: inv.team.size,
                ownerId: inv.team.owner.id,
                owner: inv.team.owner,
                requiredSkills: inv.team.skills.map((s) => s.skill.name),
                currentMembers: inv.team.members.map((m) => ({
                    userId: m.user.id,
                    name: m.user.name,
                    profilePicture: m.user.profilePicture,
                    role: m.user.techRoles || "",
                })),
            },
        }));
    };

    // ─────────────────────────────────────────────────────────
    // FOUNDER — Accept
    // ─────────────────────────────────────────────────────────
    const acceptRecommendation = async (recommendationId, founderId) => {
        const recommendation = await recommendationRepository.findRecommendationById(recommendationId);
        if (!recommendation) throw new AppError("Recommendation not found", 404);
        if (recommendation.status !== "PENDING") throw new AppError("This recommendation has already been responded to", 400);

        const team = recommendation.matchingRequest.team;
        if (!team) throw new AppError("Team not found", 404);
        if (team.ownerId !== founderId) throw new AppError("Only the team owner can accept recommendations", 403);

        const memberIds = recommendation.airecommendationMembers.map((m) => m.userId);
        if (memberIds.length === 0) throw new AppError("No members in this recommendation", 400);

        const deadline = new Date();
        deadline.setHours(deadline.getHours() + 24);

        await recommendationRepository.updateRecommendationStatus(recommendationId, "ACCEPTED", deadline);
        await recommendationRepository.rejectOtherRecommendations(recommendation.matchingRequestId, recommendationId);

        await recommendationRepository.createInvitations(
            memberIds.map((receiverId) => ({
                teamId: team.id,
                senderId: founderId,
                receiverId,
                deadline,
            }))
        );

        const hackathonTitle = recommendation.matchingRequest.hackathon?.title || "your hackathon";

        await notificationRepository.createNotifications(
            memberIds.map((receiverId) => ({
                userId: receiverId,
                type: "TEAM_INVITE",
                title: "You have been matched to a team",
                message: `You were matched to team "${team.name}" for "${hackathonTitle}". You have 24 hours to accept or decline.`,
                metadata: { teamId: team.id, recommendationId, deadline },
            }))
        );

        return { message: "Recommendation accepted. Invitations sent to all recommended members." };
    };

    // ─────────────────────────────────────────────────────────
    // FOUNDER — Reject
    // ─────────────────────────────────────────────────────────
    const rejectRecommendation = async (recommendationId, founderId) => {
        const recommendation = await recommendationRepository.findRecommendationById(recommendationId);
        if (!recommendation) throw new AppError("Recommendation not found", 404);
        if (recommendation.status !== "PENDING") throw new AppError("This recommendation has already been responded to", 400);

        const team = recommendation.matchingRequest.team;
        if (team.ownerId !== founderId) throw new AppError("Only the team owner can reject recommendations", 403);

        await recommendationRepository.updateRecommendationStatus(recommendationId, "REJECTED");
        return { message: "Recommendation rejected." };
    };

    // ─────────────────────────────────────────────────────────
    // MEMBER — Respond to invitation
    // ─────────────────────────────────────────────────────────
    const respondToInvitation = async (invitationId, userId, action) => {
        if (!["ACCEPT", "REJECT"].includes(action)) throw new AppError("Action must be ACCEPT or REJECT", 400);

        const invitation = await recommendationRepository.findInvitationById(invitationId);
        if (!invitation) throw new AppError("Invitation not found", 404);
        if (invitation.receiverId !== userId) throw new AppError("This invitation is not for you", 403);
        if (invitation.status !== "PENDING") throw new AppError("This invitation has already been responded to", 400);
        if (invitation.deadline < new Date()) throw new AppError("This invitation has expired", 400);

        const hackathonId = invitation.team.hackathonId;

        if (action === "ACCEPT") {
            const alreadyAccepted = await recommendationRepository.findAcceptedInvitationForHackathon(userId, hackathonId);
            if (alreadyAccepted) throw new AppError("You already accepted a team for this hackathon. You cannot join another.", 400);

            await recommendationRepository.updateInvitationStatus(invitationId, "ACCEPTED");

            const memberRec = await recommendationRepository.findMemberRecommendation(userId, invitation.teamId);
            if (memberRec) {
                await recommendationRepository.updateRecommendationMemberStatus(memberRec.recommendationId, userId, "ACCEPTED");
            }

            await recommendationRepository.addTeamMember({ teamId: invitation.teamId, userId });

            const memberCount = await recommendationRepository.countTeamMembers(invitation.teamId);
            const teamData = await recommendationRepository.findTeamById(invitation.teamId);
            const teamComplete = memberCount >= teamData.size;

            if (teamComplete) await recommendationRepository.updateTeamStatus(invitation.teamId, "COMPLETE");

            const { prisma } = require("../../config/prisma");
            const acceptingUser = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });

            await notificationRepository.createNotifications([{
                userId: teamData.ownerId,
                type: "INVITE_ACCEPTED",
                title: "A member accepted your invitation",
                message: `${acceptingUser?.name} joined team "${teamData.name}".${teamComplete ? " Your team is now complete!" : ""}`,
                metadata: { teamId: invitation.teamId, userId, teamComplete },
            }]);

            return { message: "You have joined the team.", teamComplete };
        }

        // REJECT
        await recommendationRepository.updateInvitationStatus(invitationId, "REJECTED");

        const memberRec = await recommendationRepository.findMemberRecommendation(userId, invitation.teamId);
        if (memberRec) {
            await recommendationRepository.updateRecommendationMemberStatus(memberRec.recommendationId, userId, "REJECTED");
        }

        const { prisma } = require("../../config/prisma");
        const rejectingUser = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
        const teamData = await recommendationRepository.findTeamById(invitation.teamId);

        await notificationRepository.createNotifications([{
            userId: teamData.ownerId,
            type: "INVITE_REJECTED",
            title: "A member declined your invitation",
            message: `${rejectingUser?.name} declined the invitation to join team "${teamData.name}".`,
            metadata: { teamId: invitation.teamId, userId },
        }]);

        return { message: "Invitation declined." };
    };


const getRecommendationDetails = async (
    recommendationId,
    userId
) => {
    const recommendation =
        await recommendationRepository.findRecommendationFullDetails(
            recommendationId
        );

    if (!recommendation) {
        throw new AppError(
            "Recommendation not found",
            404
        );
    }

    return {
        recommendationId: recommendation.id,

        status: recommendation.status,

        expiresAt: recommendation.expiresAt,

        targetTeam: {
            id: recommendation.matchingRequest.team.id,

            teamName:
                recommendation.matchingRequest.team.name,

            description:
                recommendation.matchingRequest.team
                    .description || "",

            maxMembers:
                recommendation.matchingRequest.team.size,

            requiredSkills:
                recommendation.matchingRequest.team.skills.map(
                    (s) => s.skill.name
                ),

            hackathon:
                recommendation.matchingRequest.team
                    .hackathon,
        },

        recommendedMembers:
            recommendation.airecommendationMembers.map(
                (member) => ({
                    userId: member.user.id,

                    name: member.user.name,

                    profilePicture:
                        member.user.profilePicture,

                    bio: member.user.bio || "",

                    role:
                        member.user.techRoles?.[0] || "",

                    skills:
                        member.user.skills.map(
                            (s) => s.skill.name
                        ),

                    invitationStatus:
                        member.status,
                })
            ),
    };
};





    module.exports = {
        getMyTeamsTab,
        getJoinTab,
        acceptRecommendation,
        rejectRecommendation,
        respondToInvitation,
        getRecommendationDetails,
    };