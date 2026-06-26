const matchingRepository = require("./matching.repository");
const notificationRepository = require("../notifications/notification.repository");
const {
    generateHackathonRecommendations,
    generateProjectRecommendations,
} = require("../ai/aiCandidate.service");
const { getOrCreateAIId } = require("../ai/ai.mapper");
const AppError = require("../../utils/AppError");
const prisma = require("../../config/prisma");

const POOL_THRESHOLD = 30;



const getPinnedMemberIds = async (team) => {
    // team.members includes owner + anyone who accepted an invitation
    const acceptedNonOwnerIds = team.members
        .map(m => m.userId)
        .filter(id => id !== team.ownerId);

    if (acceptedNonOwnerIds.length === 0) return [];

    // sync each accepted member to AI and get their integer IDs
    const pinnedIds = await Promise.all(
        acceptedNonOwnerIds.map(id => getOrCreateAIId(id, "USER"))
    );

    return pinnedIds;
};


const enrichMembers = async (userIds) => {
    console.log("🔥🔥🔥 NEW enrichMembers is running!");
    try {
        console.log("📤 enrichMembers called with:", userIds);
        if (!userIds || !Array.isArray(userIds)) {
            console.warn("⚠️ userIds is not an array:", userIds);
            return [];
        }

        const validIds = userIds.filter(id => id && typeof id === 'string');
        console.log("📤 validIds:", validIds);
        if (validIds.length === 0) {
            console.log("No valid user IDs found.");
            return [];
        }

        const users = await prisma.user.findMany({
            where: { id: { in: validIds } },
            select: {
                id: true,
                name: true,
                profilePicture: true,
                techRoles: true,
                skills: {
                    include: { skill: { select: { name: true } } },
                },
            },
        });
        console.log("📤 Found users in DB:", users.length);

        const result = validIds.map((userId) => {
            try {
                const user = users.find((u) => u.id === userId);
                if (!user) {
                    console.warn(`⚠️ User with ID ${userId} not found in DB`);
                    return {
                        userId,
                        name: "Unknown User",
                        profilePicture: null,
                        role: "",
                        tags: [],
                    };
                }
                // SAFE: no .user reference
                return {
                    userId: user.id,
                    name: user.name || "",
                    profilePicture: user.profilePicture || null,
                    role: user.techRoles && user.techRoles.length > 0 ? user.techRoles[0] : "",
                    tags: user.skills && Array.isArray(user.skills) ? user.skills.map(s => s.skill.name) : [],
                };
            } catch (err) {
                console.error(`❌ Error processing userId ${userId}:`, err);
                return {
                    userId,
                    name: "Error User",
                    profilePicture: null,
                    role: "",
                    tags: [],
                };
            }
        });
        return result;
    } catch (err) {
        console.error("❌ enrichMembers fatal error:", err);
        return [];
    }
};

const saveRecommendationsAndNotify = async ({
    matchingRequestId,
    teamId,
    ownerId,
    convertedTeams,
    hackathonTitle,
    roundNumber,
}) => {
    console.log(`📝 Saving ${convertedTeams.length} teams for request ${matchingRequestId}`);
    console.log("📝 convertedTeams type:", typeof convertedTeams);
    console.log("📝 convertedTeams is array?", Array.isArray(convertedTeams));
    console.log("📝 convertedTeams content:", JSON.stringify(convertedTeams, null, 2));
    // Validate inputs
    if (!matchingRequestId) {
        console.error("❌ matchingRequestId is undefined!");
        throw new Error("matchingRequestId is required");
    }
    if (!convertedTeams || !Array.isArray(convertedTeams) || convertedTeams.length === 0) {
        console.error("❌ convertedTeams is empty or not an array:", convertedTeams);
        throw new Error("convertedTeams must be a non-empty array");
    }

    try {
        const recommendationRows = await Promise.all(
            convertedTeams.map(async (memberIds, index) => {
                try {
                    console.log(`📝 Enriching members for team ${index + 1}: ${memberIds?.length || 0} members`);

                    // Validate memberIds
                    if (!memberIds || !Array.isArray(memberIds)) {
                        throw new Error(`memberIds is not an array for team ${index + 1}: ${typeof memberIds}`);
                    }

                    const enrichedMembers = await enrichMembers(memberIds);
                    if (!enrichedMembers || enrichedMembers.length === 0) {
                        console.warn(`⚠️ No enriched members for team ${index + 1}, using empty array`);
                    }

                    return {
                        matchingRequestId,
                        teamData: {
                            members: enrichedMembers || [],
                        },
                        status: "PENDING",
                    };
                } catch (err) {
                    console.error(`❌ Error processing team ${index + 1}:`, err);
                    throw new Error(`Error processing team ${index + 1}: ${err.message}`);
                }
            })
        );

        console.log("STEP 1 - Creating recommendations");

        const createdRecs = await matchingRepository.createRecommendations(recommendationRows);

        console.log("STEP 2 - Recommendations created");

        const memberRows = [];
        for (let i = 0; i < createdRecs.length; i++) {
            const rec = createdRecs[i];
            const memberIds = convertedTeams[i];
            if (!memberIds || !Array.isArray(memberIds)) {
                console.warn(`⚠️ Skipping member rows for team ${i + 1} because memberIds is invalid`);
                continue;
            }
            for (const userId of memberIds) {
                if (userId) {
                    memberRows.push({
                        recommendationId: rec.id,
                        userId,
                        status: "PENDING",
                    });
                }
            }
        }

        console.log("STEP 3 - Member rows prepared");

        if (memberRows.length > 0) {
            await matchingRepository.createRecommendationMembers(memberRows);
        }
        console.log("STEP 4 - Recommendation members created");

        await matchingRepository.updateMatchingRequestStatus(matchingRequestId, "COMPLETED");

        console.log("STEP 5 - Matching request completed");

        await notificationRepository.createNotifications([
            {
                userId: ownerId,
                type: roundNumber > 1 ? "ROUND2_AVAILABLE" : "RECOMMENDATION_RECEIVED",
                title: roundNumber > 1
                    ? "Round 2 recommendations are ready!"
                    : "Your team recommendations are ready",
                message: roundNumber > 1
                    ? `Round ${roundNumber} is done! We found ${createdRecs.length} new recommended team(s) for "${hackathonTitle}". Check your recommendations page to review and accept.`
                    : `We found ${createdRecs.length} recommended team(s) for "${hackathonTitle}". Check your recommendations page.`,
                metadata: { teamId, matchingRequestId, round: roundNumber },
            },
        ]);

        console.log("STEP 6 - Notification sent");

    } catch (err) {
        console.error("❌ saveRecommendationsAndNotify failed:", err);
        // Mark the matching request as FAILED
        await matchingRepository.updateMatchingRequestStatus(matchingRequestId, "FAILED");
        throw err; // rethrow to be caught by the caller
    }
};

// ─────────────────────────────────────────────────────────
// CASE 1 — Project matching
// ─────────────────────────────────────────────────────────
const triggerProjectMatching = async (projectId) => {
    const project = await matchingRepository.findProjectWithTeam(projectId);
    if (!project || !project.team) return;

    const team = project.team;
    const skillTags = team.skills.map((s) => s.skill.name);
    const roleTags = team.roles || [];
    const tags = [...new Set([...skillTags, ...roleTags])];

    const slotsNeeded = team.size - team.members.length;
    if (slotsNeeded <= 0) return;

    const pinnedMemberIds = await getPinnedMemberIds(team);
    const excludeFromSearch = [
        team.ownerId,
        ...team.members.map(m => m.userId),
    ];

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
            teamSize: team.size,
            pinnedMemberIds,
            excludeUserIds: excludeFromSearch,
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
// CASE 2 — Hackathon matching (10pm cron)
// ─────────────────────────────────────────────────────────
const triggerHackathonMatching = async () => {
    const hackathons = await matchingRepository.findHackathonsReadyForMatching(POOL_THRESHOLD);

    for (const hackathon of hackathons) {
        const teamsQueue = await matchingRepository.findTeamsQueueByHackathon(hackathon.id);

        for (let i = 0; i < teamsQueue.length; i++) {
            const team = teamsQueue[i];
            const skillTags = team.skills.map((s) => s.skill.name);
            const roleTags = team.roles || [];
            const tags = [...new Set([...skillTags, ...roleTags])];

            const slotsNeeded = team.size - team.members.length;
            if (slotsNeeded <= 0) continue;

            //first we need to get the accepted members who accept the invitations the owner sent
            const pinnedMemberIds = await getPinnedMemberIds(team);

            // exclude owner + already accepted from search pool
            const excludeFromSearch = [
                team.ownerId,
                ...team.members.map(m => m.userId),
            ];

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
                    teamSize: team.size,
                    pinnedMemberIds,
                    excludeUserIds: excludeFromSearch,
                });

                console.log("✅ convertedTeams before saving:", JSON.stringify(convertedTeams, null, 2));
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
                console.error(`❌ Matching failed for team ${team.id}:`, err.stack || err.message);
            }
        }
    }
};

// ─────────────────────────────────────────────────────────
// ROUND 2
// ─────────────────────────────────────────────────────────
const triggerRound2 = async (teamId, founderId) => {
    const team = await matchingRepository.findTeamById(teamId);
    if (!team) throw new AppError("Team not found", 404);
    if (team.ownerId !== founderId) throw new AppError("Only the team owner can request new recommendations", 403);
    if (team.status === "COMPLETE") throw new AppError("Team is already complete", 400);

    const lastRequest = await matchingRepository.findLastMatchingRequestForTeam(teamId);
    if (!lastRequest) throw new AppError("No previous matching found for this team", 400);

    const currentMemberCount = await matchingRepository.countTeamMembers(teamId);
    // const slotsRemaining = team.size - currentMemberCount;
    // if (slotsRemaining <= 0) throw new AppError("Team already has enough members", 400);
    if (team.size - currentMemberCount <= 0) throw new AppError("Team already has enough members", 400);

    const acceptedRows = await matchingRepository.findAcceptedRecommendationMembers(teamId);
    const confirmedUserIds = acceptedRows.map((r) => r.userId);

    const rejectedRows = await matchingRepository.findRejectedRecommendationMembers(teamId);
    const excludeUserIds = rejectedRows.map((r) => r.userId);

    const pinnedMemberIds = await Promise.all(
        confirmedUserIds.map((id) => getOrCreateAIId(id, "USER"))
    );

    const nextRoundNumber = lastRequest.roundNumber + 1;
    const skillTags = team.skills.map((s) => s.skill.name);
    const roleTags = team.roles || [];
    const tags = [...new Set([...skillTags, ...roleTags])];

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
                teamSize: team.size,
                pinnedMemberIds,
                excludeUserIds,
            });
        } else {
            convertedTeams = await generateHackathonRecommendations({
                hackathonId: lastRequest.hackathonId,
                hackathonAiEntityId: lastRequest.hackathonId,
                tags,
                teamSize: team.size,
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
// CRON — Check expired invitations
// ─────────────────────────────────────────────────────────
const checkExpiredInvitations = async () => {
    await matchingRepository.markExpiredInvitations();

    const teamsToCheck = await matchingRepository.findFormingTeamsWithNoOpenInvitations();

    for (const team of teamsToCheck) {
        const memberCount = team.members.length;
        if (memberCount >= team.size) {
            await matchingRepository.updateTeamStatus(team.id, "COMPLETE");
        } else {
            const openSlots = team.size - memberCount;
            await notificationRepository.createNotifications([{
                userId: team.ownerId,
                type: "ROUND2_AVAILABLE",
                title: "Some invitations expired",
                message: `${openSlots} slot(s) in your team are still open. You can request new recommendations or keep the current team.`,
                metadata: { teamId: team.id, openSlots },
            }]);
        }
    }
};

module.exports = {
    triggerProjectMatching,
    triggerHackathonMatching,
    triggerRound2,
    checkExpiredInvitations,
};