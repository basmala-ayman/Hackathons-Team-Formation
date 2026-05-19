const matchingRepository = require("./matching.repository");
const notificationRepository = require("../notifications/notification.repository");
const {
    generateHackathonRecommendations,
    generateProjectRecommendations,
} = require("../ai/aiCandidate.service");
const { getOrCreateAIId } = require("../ai/ai.mapper");
const AppError = require("../../utils/AppError");
const { prisma } = require("../../config/prisma");


const POOL_THRESHOLD = 30;

// ─────────────────────────────────────────────────────────
// shared helper — saves AI recommendations + member rows + notifies owner
// used by all 3 flows (project, hackathon, round2)
// ─────────────────────────────────────────────────────────
const saveRecommendationsAndNotify = async ({
    matchingRequestId,
    teamId,
    ownerId,
    convertedTeams, // array of arrays of real UUIDs from AI after making the mapping 
    hackathonTitle,
    roundNumber,
}) => {
    // build recommendation rows  JSON snapshot + compatibility score
    const recommendationRows = convertedTeams.map((memberIds, index) => ({
        matchingRequestId,
        teamData: {
            members: memberIds.map((userId) => ({ userId })),
        },
        // AI returns teams ranked best-first — score descends slightly per rank
        compatibilityScore: parseFloat((1 - index * 0.05).toFixed(2)),
        status: "PENDING",
    }));

    // store recommendations in the database and get back their IDs
    const createdRecs = await matchingRepository.createRecommendations(recommendationRows);

    // store each member in AIRecommendationMember (queryable table)
    const memberRows = [];
    for (let i = 0; i < createdRecs.length; i++) {
        const rec = createdRecs[i];
        const memberIds = convertedTeams[i];
        for (const userId of memberIds) {
            memberRows.push({
                recommendationId: rec.id,
                userId,
                status: "PENDING",
            });
        }
    }

    if (memberRows.length > 0) {
        await matchingRepository.createRecommendationMembers(memberRows);
    }

    await matchingRepository.updateMatchingRequestStatus(matchingRequestId, "COMPLETED");

    // notify owner
    await notificationRepository.createNotifications([
        {
            userId: ownerId,
            type: "RECOMMENDATION_RECEIVED",
            title: roundNumber > 1
                ? `Round ${roundNumber} recommendations ready`
                : "Your team recommendations are ready",
            message: `We found ${createdRecs.length} recommended team(s) for "${hackathonTitle}". Check your recommendations page.`,
            metadata: { teamId, matchingRequestId, round: roundNumber },
        },
    ]);
};

//bow from here all the coming functions will use this previous shared duplicated function cause it is duplicated 
// ─────────────────────────────────────────────────────────
// CASE 1  Project matching
// Triggered immediately when project pool hits 30
// ─────────────────────────────────────────────────────────
const triggerProjectMatching = async (projectId) => {
    const project = await matchingRepository.findProjectWithTeam(projectId);
    if (!project || !project.team) return;

    const team = project.team;
    const tags = team.skills.map((s) => s.skill.name);
    const slotsNeeded = team.size - team.members.length;

    if (slotsNeeded <= 0) return;

    const matchingRequest = await matchingRepository.createMatchingRequest({
        userId: team.ownerId,
        hackathonId: team.hackathonId,
        teamId: team.id,
        projectId: project.id,
        roundNumber: 1,
        status: "PROCESSING",
    });

    try {
        const convertedTeams = await generateProjectRecommendations({
            projectId: project.id,
            tags,
            teamSize: slotsNeeded,
        });

        const hackathon = await prisma.hackathon.findUnique({
            where: { id: team.hackathonId },
            select: { title: true },
        });

        await saveRecommendationsAndNotify({
            matchingRequestId: matchingRequest.id,
            teamId: team.id,
            ownerId: team.ownerId,
            convertedTeams,
            hackathonTitle: hackathon?.title || "your hackathon",
            roundNumber: 1,
        });
    } catch (err) {
        await matchingRepository.updateMatchingRequestStatus(matchingRequest.id, "FAILED");
        console.error("Project matching failed:", err.message);
    }
};

// ─────────────────────────────────────────────────────────
// CASE 2  Hackathon matching (10pm cron)
// Processes all hackathons where pool >= 30
// Each team owner in the queue gets their own recommendations
// ─────────────────────────────────────────────────────────
const triggerHackathonMatching = async () => {
    const hackathons = await matchingRepository.findHackathonsReadyForMatching(POOL_THRESHOLD);

    for (const hackathon of hackathons) {
        const teamsQueue = await matchingRepository.findTeamsQueueByHackathon(hackathon.id);

        for (let i = 0; i < teamsQueue.length; i++) {
            const team = teamsQueue[i];
            const tags = team.skills.map((s) => s.skill.name);
            const slotsNeeded = team.size - team.members.length;

            if (slotsNeeded <= 0) continue;

            const matchingRequest = await matchingRepository.createMatchingRequest({
                userId: team.ownerId,
                hackathonId: hackathon.id,
                teamId: team.id,
                projectId: null,
                roundNumber: 1,
                queuePosition: i + 1,
                status: "PROCESSING",
            });

            try {
                const convertedTeams = await generateHackathonRecommendations({
                    hackathonId: hackathon.id,
                    hackathonAiEntityId: hackathon.id,
                    tags,
                    teamSize: slotsNeeded,
                });

                await saveRecommendationsAndNotify({
                    matchingRequestId: matchingRequest.id,
                    teamId: team.id,
                    ownerId: team.ownerId,
                    convertedTeams,
                    hackathonTitle: hackathon.title,
                    roundNumber: 1,
                });
            } catch (err) {
                await matchingRepository.updateMatchingRequestStatus(matchingRequest.id, "FAILED");
                console.error(`Matching failed for team ${team.id}:`, err.message);
                // continue to next team even if this one fails
            }
        }
    }
};

// ─────────────────────────────────────────────────────────
// ROUND 2  Founder requests new members for open slots
// ─────────────────────────────────────────────────────────
const triggerRound2 = async (teamId, founderId) => {
    const team = await matchingRepository.findTeamById(teamId);
    if (!team) throw new AppError("Team not found", 404);
    if (team.ownerId !== founderId) {
        throw new AppError("Only the team owner can request new recommendations", 403);
    }
    if (team.status === "COMPLETE") {
        throw new AppError("Team is already complete", 400);
    }

    const lastRequest = await matchingRepository.findLastMatchingRequestForTeam(teamId);
    if (!lastRequest) throw new AppError("No previous matching found for this team", 400);

    const currentMemberCount = await matchingRepository.countTeamMembers(teamId);
    const slotsRemaining = team.size - currentMemberCount;
    if (slotsRemaining <= 0) throw new AppError("Team already has enough members", 400);

    // get already confirmed members — AI will not re-suggest them 
    const acceptedRows = await matchingRepository.findAcceptedRecommendationMembers(teamId);
    const confirmedUserIds = acceptedRows.map((r) => r.userId);

    // get ALL previously recommended users — exclude from search pool
    const allRecommendedRows = await matchingRepository.findAllRecommendedUserIdsForTeam(teamId);
    const excludeUserIds = allRecommendedRows.map((r) => r.userId);

    // get pinned as AI integer ids
    const pinnedMemberIds = await Promise.all(
        confirmedUserIds.map((id) => getOrCreateAIId(id, "USER"))
    );

    const nextRoundNumber = lastRequest.roundNumber + 1;
    const tags = team.skills.map((s) => s.skill.name);

    const matchingRequest = await matchingRepository.createMatchingRequest({
        userId: founderId,
        hackathonId: lastRequest.hackathonId,
        teamId,
        projectId: lastRequest.projectId || null,
        roundNumber: nextRoundNumber,
        status: "PROCESSING",
    });

    try {
        let convertedTeams;

        if (lastRequest.projectId) {
            convertedTeams = await generateProjectRecommendations({
                projectId: lastRequest.projectId,
                tags,
                teamSize: slotsRemaining,
                pinnedMemberIds,
                excludeUserIds,
            });
        } else {
            convertedTeams = await generateHackathonRecommendations({
                hackathonId: lastRequest.hackathonId,
                hackathonAiEntityId: lastRequest.hackathonId,
                tags,
                teamSize: slotsRemaining,
                pinnedMemberIds,
                excludeUserIds,
            });
        }

        const hackathon = await prisma.hackathon.findUnique({
            where: { id: lastRequest.hackathonId },
            select: { title: true },
        });

        await saveRecommendationsAndNotify({
            matchingRequestId: matchingRequest.id,
            teamId,
            ownerId: founderId,
            convertedTeams,
            hackathonTitle: hackathon?.title || "your hackathon",
            roundNumber: nextRoundNumber,
        });

        return { matchingRequestId: matchingRequest.id };
    } catch (err) {
        await matchingRepository.updateMatchingRequestStatus(matchingRequest.id, "FAILED");
        throw new AppError("Round 2 matching failed. Please try again.", 500);
    }
};

// ─────────────────────────────────────────────────────────
// CRON — Check expired invitations every hour
// ─────────────────────────────────────────────────────────
const checkExpiredInvitations = async () => {
    // mark all PENDING invitations past their deadline as EXPIRED
    await matchingRepository.markExpiredInvitations();

    // find FORMING teams with no pending invitations left
    const teamsToCheck = await matchingRepository.findFormingTeamsWithNoOpenInvitations();

    for (const team of teamsToCheck) {
        const memberCount = team.members.length;

        if (memberCount >= team.size) {
            // team is full — mark complete
            await matchingRepository.updateTeamStatus(team.id, "COMPLETE");
        } else {
            // team still has open slots — notify founder to decide on round 2
            const openSlots = team.size - memberCount;
            await notificationRepository.createNotifications([
                {
                    userId: team.ownerId,
                    type: "ROUND2_AVAILABLE",
                    title: "Some invitations expired",
                    message: `${openSlots} slot(s) in your team are still open. You can request new recommendations or keep the current team.`,
                    metadata: { teamId: team.id, openSlots },
                },
            ]);
        }
    }
};

module.exports = {
    triggerProjectMatching,
    triggerHackathonMatching,
    triggerRound2,
    checkExpiredInvitations,
};