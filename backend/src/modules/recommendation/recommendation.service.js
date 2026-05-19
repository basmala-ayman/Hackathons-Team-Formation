const recommendationRepository = require("./recommendation.repository");
const notificationRepository = require("../notifications/notification.repository");
const AppError = require("../../utils/AppError");

// ─────────────────────────────────────────────────────────
// GET  "My Teams" tab
// founder sees their teams + recommendations + progress per recommendation
// ─────────────────────────────────────────────────────────
const getMyTeamsTab = async (userId) => {
    const teams = await recommendationRepository.findOwnerTeamsWithRecommendations(userId);

    return teams.map((team) => {
        const latestRequest = team.matchingRequests[0] || null;

        const recommendations = latestRequest
            ? latestRequest.recommendations.map((rec) => {
                  // each member row already has their status from AIRecommendationMember
                  const members = rec.airecommendationMembers.map((m) => ({
                      userId: m.user.id,
                      name: m.user.name,
                      profilePicture: m.user.profilePicture,
                      techRole: m.user.techRole,
                      invitationStatus: m.status, // PENDING | ACCEPTED | REJECTED | EXPIRED
                  }));

                  const accepted = members.filter((m) => m.invitationStatus === "ACCEPTED").length;
                  const rejected = members.filter((m) => m.invitationStatus === "REJECTED" || m.invitationStatus === "EXPIRED").length;
                  const pending  = members.filter((m) => m.invitationStatus === "PENDING").length;

                  return {
                      id: rec.id,
                      compatibilityScore: rec.compatibilityScore,
                      status: rec.status,
                      expiresAt: rec.expiresAt,
                      members,
                      progress: {
                          total: members.length,
                          accepted,
                          rejected,
                          pending,
                          // percentage bar for the frontend
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
            status: team.status,
            size: team.size,
            hackathon: team.hackathon,
            requiredSkills: team.skills.map((s) => s.skill.name),
            currentMembers: team.members.map((m) => m.user),
            matchingRound: latestRequest ? latestRequest.roundNumber : 0,
            matchingStatus: latestRequest ? latestRequest.status : null,
            recommendations,
        };
    });
};

// ─────────────────────────────────────────────────────────
// GET  "Join" tab
// member sees all invitations they received
// ─────────────────────────────────────────────────────────
const getJoinTab = async (userId) => {
    const invitations = await recommendationRepository.findReceivedInvitations(userId);

    return invitations.map((inv) => ({
        invitationId: inv.id,
        status: inv.status,
        deadline: inv.deadline,
        team: {
            id: inv.team.id,
            name: inv.team.name,
            hackathon: inv.team.hackathon,
            owner: inv.team.owner,
            requiredSkills: inv.team.skills.map((s) => s.skill.name),
            currentMembers: inv.team.members.map((m) => m.user),
        },
    }));
};

// ─────────────────────────────────────────────────────────
// FOUNDER  Accept one recommended team
// sends invitations to all members in that recommendation
// auto-rejects the other two
// ─────────────────────────────────────────────────────────
const acceptRecommendation = async (recommendationId, founderId) => {
    const recommendation = await recommendationRepository.findRecommendationById(recommendationId);
    if (!recommendation) throw new AppError("Recommendation not found", 404);
    if (recommendation.status !== "PENDING") {
        throw new AppError("This recommendation has already been responded to", 400);
    }

    const team = recommendation.matchingRequest.team;
    if (!team) throw new AppError("Team not found", 404);
    if (team.ownerId !== founderId) {
        throw new AppError("Only the team owner can accept recommendations", 403);
    }

    const memberIds = recommendation.airecommendationMembers.map((m) => m.userId);
    if (memberIds.length === 0) throw new AppError("No members in this recommendation", 400);

    // invitations expire in 24 hours
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 24);

    // mark this recommendation ACCEPTED with expiry
    await recommendationRepository.updateRecommendationStatus(
        recommendationId,
        "ACCEPTED",
        deadline
    );

    // auto-reject the other recommendations for this request
    await recommendationRepository.rejectOtherRecommendations(
        recommendation.matchingRequestId,
        recommendationId
    );

    // create TeamInvitation rows for each recommended member
    await recommendationRepository.createInvitations(
        memberIds.map((receiverId) => ({
            teamId: team.id,
            senderId: founderId,
            receiverId,
            deadline,
        }))
    );

    // notify each recommended member
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
// FOUNDER  Reject a recommended team
// ─────────────────────────────────────────────────────────
const rejectRecommendation = async (recommendationId, founderId) => {
    const recommendation = await recommendationRepository.findRecommendationById(recommendationId);
    if (!recommendation) throw new AppError("Recommendation not found", 404);
    if (recommendation.status !== "PENDING") {
        throw new AppError("This recommendation has already been responded to", 400);
    }

    const team = recommendation.matchingRequest.team;
    if (team.ownerId !== founderId) {
        throw new AppError("Only the team owner can reject recommendations", 403);
    }

    await recommendationRepository.updateRecommendationStatus(recommendationId, "REJECTED");

    return { message: "Recommendation rejected." };
};

// ─────────────────────────────────────────────────────────
// MEMBER  Respond to an invitation (ACCEPT or REJECT)
// ─────────────────────────────────────────────────────────
const respondToInvitation = async (invitationId, userId, action) => {
    if (!["ACCEPT", "REJECT"].includes(action)) {
        throw new AppError("Action must be ACCEPT or REJECT", 400);
    }

    const invitation = await recommendationRepository.findInvitationById(invitationId);
    if (!invitation) throw new AppError("Invitation not found", 404);
    if (invitation.receiverId !== userId) {
        throw new AppError("This invitation is not for you", 403);
    }
    if (invitation.status !== "PENDING") {
        throw new AppError("This invitation has already been responded to", 400);
    }
    if (invitation.deadline < new Date()) {
        throw new AppError("This invitation has expired", 400);
    }

    const hackathonId = invitation.team.hackathonId;
    const team = invitation.team;

    if (action === "ACCEPT") {
        // enforce: one team per hackathon per user
        const alreadyAccepted = await recommendationRepository.findAcceptedInvitationForHackathon(
            userId,
            hackathonId
        );
        if (alreadyAccepted) {
            throw new AppError(
                "You already accepted a team for this hackathon. You cannot join another.",
                400
            );
        }

        // update invitation
        await recommendationRepository.updateInvitationStatus(invitationId, "ACCEPTED");

        // update AIRecommendationMember status so progress bar reflects it
        const memberRec = await recommendationRepository.findMemberRecommendation(
            userId,
            invitation.teamId
        );
        if (memberRec) {
            await recommendationRepository.updateRecommendationMemberStatus(
                memberRec.recommendationId,
                userId,
                "ACCEPTED"
            );
        }

        // add to actual team members
        await recommendationRepository.addTeamMember({
            teamId: invitation.teamId,
            userId,
        });

        // check if team is now full
        const memberCount = await recommendationRepository.countTeamMembers(invitation.teamId);
        const teamData = await recommendationRepository.findTeamById(invitation.teamId);
        const teamComplete = memberCount >= teamData.size;

        if (teamComplete) {
            await recommendationRepository.updateTeamStatus(invitation.teamId, "COMPLETE");
        }

        // notify founder
        const { prisma } = require("../../config/prisma");
        const acceptingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true },
        });

        await notificationRepository.createNotifications([
            {
                userId: teamData.ownerId,
                type: "INVITE_ACCEPTED",
                title: "A member accepted your invitation",
                message: `${acceptingUser?.name} joined team "${teamData.name}".${
                    teamComplete ? " Your team is now complete!" : ""
                }`,
                metadata: { teamId: invitation.teamId, userId, teamComplete },
            },
        ]);

        return {
            message: "You have joined the team.",
            teamComplete,
        };
    }

    // REJECT
    await recommendationRepository.updateInvitationStatus(invitationId, "REJECTED");

    // update AIRecommendationMember status
    const memberRec = await recommendationRepository.findMemberRecommendation(
        userId,
        invitation.teamId
    );
    if (memberRec) {
        await recommendationRepository.updateRecommendationMemberStatus(
            memberRec.recommendationId,
            userId,
            "REJECTED"
        );
    }

    // notify founder
    const { prisma } = require("../../config/prisma");
    const rejectingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
    });
    const teamData = await recommendationRepository.findTeamById(invitation.teamId);

    await notificationRepository.createNotifications([
        {
            userId: teamData.ownerId,
            type: "INVITE_REJECTED",
            title: "A member declined your invitation",
            message: `${rejectingUser?.name} declined the invitation to join team "${teamData.name}".`,
            metadata: { teamId: invitation.teamId, userId },
        },
    ]);

    return { message: "Invitation declined." };
};

module.exports = {
    getMyTeamsTab,
    getJoinTab,
    acceptRecommendation,
    rejectRecommendation,
    respondToInvitation,
};