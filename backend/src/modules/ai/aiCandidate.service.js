const prisma = require("../../config/prisma");
const { getOrCreateAIId, getRealEntityId } = require("./ai.mapper");
const aiService = require("./ai.service");

// ─────────────────────────────────────────────────────────
// what is REHYDRATION?
// HuggingFace spaces sleep after inactivity and wipe their
// in-memory data. Before every recommendation call we check
// /status and if memory_wiped = true we re-sync everything.
// ─────────────────────────────────────────────────────────
const rehydrateIfNeeded = async () => {
    const status = await aiService.getStatus();

    if (!status.memory_wiped) return; // AI still has data, nothing to do

    //else so we will need to just prepare the information again and return it back again to the ai model
    console.log("AI memory wiped — rehydrating from DB...");

    // 1. sync all projects from DB
    const projects = await prisma.project.findMany({
        include: {
            team: {
                include: {
                    skills: { include: { skill: true } },
                },
            },
        },
    });

    for (const project of projects) {
        const aiProjectId = await getOrCreateAIId(project.id, "PROJECT");
        const tags = project.team?.skills?.map((s) => s.skill.name) || [];
        await aiService.syncProject({ id: aiProjectId, tags });
    }

    // 2. sync all hackathons that were used as "projects" in matching
    // (Case 2 — hackathon itself is synced as a project to the AI)
    const usedHackathons = await prisma.matchingRequest.findMany({
        where: { projectId: null, status: "COMPLETED" },
        select: { hackathonId: true },
        distinct: ["hackathonId"],
    });

    for (const { hackathonId } of usedHackathons) {
        const aiHackathonId = await getOrCreateAIId(hackathonId, "PROJECT");
        await aiService.syncProject({ id: aiHackathonId, tags: [] });
    }

    // 3. sync all users who ever pressed interested (candidate pool)
    const allUsers = await prisma.user.findMany({
        where: {
            OR: [
                { hackathonInterests: { some: {} } },
                { projectInterests: { some: {} } },
            ],
        },
        include: {
            skills: { include: { skill: true } },
            teamMemberships: { select: { teamId: true } },
        },
    });

    for (const user of allUsers) {
        const aiId = await getOrCreateAIId(user.id, "USER");
        const skillNames = user.skills.map((s) => s.skill.name);
        const roleNames = user.techRoles || [];
        const skills = [...new Set([...skillNames, ...roleNames])];
        
        const pastTeamIds = user.teamMemberships.map((m) => m.teamId);
        await aiService.syncMember({
            id: aiId,
            bio: user.bio || "",
            skills,
            past_teammate_ids: [],
            past_team_ids: pastTeamIds,
        });
    }

    console.log("AI memory rehydrated successfully.");
};

// ─────────────────────────────────────────────────────────
// HACKATHON CANDIDATES
// Case 2 — users who pressed "Interested" on a hackathon
// ─────────────────────────────────────────────────────────


//here we prepare the candidate pool before calling the sync ai endpoint to make it is updated 
const prepareHackathonCandidates = async (hackathonId) => {
    console.log("🔍 Preparing candidates for hackathon:", hackathonId);
    const interests = await prisma.hackathonInterest.findMany({
        where: { hackathonId },
        include: {
            user: {
                include: {
                    skills: { include: { skill: true } },
                    teamMemberships: { select: { teamId: true } },
                },
            },
        },
    });

    console.log(`🔍 Found ${interests.length} interests`);
    if (interests.length > 0) {
        console.log('First interest:', JSON.stringify(interests[0], null, 2));
    }

    const preparedMembers = [];

    for (const interest of interests) {
        if (!interest) {
            console.warn("⚠️ interest is null/undefined");
            continue;
        }
        const user = interest.user;
        if (!user) {
            console.warn(`❌ Interest has no user! Interest:`, interest);
            continue;
        }
        if (!interest.user) {
            console.warn("⚠️ interest.user is null/undefined for interest:", interest);
            continue;
        }

        const aiId = await getOrCreateAIId(user.id, "USER");
        const skillNames = user.skills.map((s) => s.skill.name);
        const roleNames = user.techRoles || [];
        const skills = [...new Set([...skillNames, ...roleNames])];

        // const pastTeamIds = user.teamMemberships.map((m) => m.teamId);
        const pastTeamAiIds = await Promise.all(
            user.teamMemberships.map((m) => getOrCreateAIId(m.teamId, "TEAM"))
        );

        await aiService.syncMember({
            id: aiId,
            bio: user.bio || "",
            skills,
            past_teammate_ids: [],
            past_team_ids: pastTeamAiIds,
        });

        preparedMembers.push({ realUserId: user.id, aiId });
    }

    return preparedMembers;
};


//and here to call the recommendation endpoint to the ai model to make it return the recommendations teams 
const generateHackathonRecommendations = async ({
    hackathonId,
    hackathonAiEntityId, // the hackathonId used as the "project" entity in AI
    tags,
    teamSize,
    pinnedMemberIds = [], // round 2: already confirmed members as AI integer ids
    excludeUserIds = [],  // round 2: exclude already invited users from search pool
}) => {
    // check AI memory before every recommendation call
    await rehydrateIfNeeded();

    const candidates = await prepareHackathonCandidates(hackathonId);
    console.log(`✅ Candidates prepared: ${candidates.length}`);

    // exclude already invited users (round 2)
    const filteredCandidates = candidates.filter(
        (c) => !excludeUserIds.includes(c.realUserId)
    );

    console.log(`✅ Filtered candidates: ${filteredCandidates.length}`);


    const searchMemberIds = filteredCandidates.map((c) => c.aiId);
    console.log(`✅ Search member IDs: ${searchMemberIds.length}`);

    // sync hackathon as a "project" entity to AI
    const aiProjectId = await getOrCreateAIId(hackathonAiEntityId, "PROJECT");
    console.log(`✅ AI project ID: ${aiProjectId}`);

    await aiService.syncProject({ id: aiProjectId, tags });
    console.log(`📤 Calling AI with teamSize: ${teamSize}, tags: ${tags}`);

    const result = await aiService.getRecommendations({
        projectId: aiProjectId,
        tags,
        searchMemberIds,
        teamSize,
        pinnedMemberIds,
    });
    console.log(`✅ AI result:`, JSON.stringify(result, null, 2));

    // convert AI integer ids back to real UUIDs
    const convertedTeams = [];
    for (const team of result.recommended_teams) {
        const realMembers = [];
        for (const aiId of team) {
            try {
                const realUserId = await getRealEntityId(aiId);
                if (realUserId) realMembers.push(realUserId);
            } catch (err) {
                console.warn(`⚠️ Skipping AI ID ${aiId} – mapping not found`, err.message);
            }
        }
        // convertedTeams.push(realMembers);
        if (realMembers.length > 0) convertedTeams.push(realMembers);
    }

    console.log(`✅ Converted teams: ${convertedTeams.length}`);
    return convertedTeams;
};

// ─────────────────────────────────────────────────────────
// PROJECT CANDIDATES
// Case 1 — users who pressed "Interested" on a project
// ─────────────────────────────────────────────────────────

//the same things exactly will happened but for the projects side 
const prepareProjectCandidates = async (projectId) => {
    const interests = await prisma.projectInterest.findMany({
        where: { projectId },
        include: {
            user: {
                include: {
                    skills: { include: { skill: true } },
                    teamMemberships: { select: { teamId: true } },
                },
            },
        },
    });

    const preparedMembers = [];

    for (const interest of interests) {
        const user = interest.user;
        const aiId = await getOrCreateAIId(user.id, "USER");
        const skillNames = user.skills.map((s) => s.skill.name);
        const roleNames = user.techRoles || [];
        const skills = [...new Set([...skillNames, ...roleNames])];

        const pastTeamAiIds = await Promise.all(
            user.teamMemberships.map((m) => getOrCreateAIId(m.teamId, "TEAM"))
        );
        await aiService.syncMember({
            id: aiId,
            bio: user.bio || "",
            skills,
            past_teammate_ids: [],
            past_team_ids: pastTeamAiIds,
        });

        preparedMembers.push({ realUserId: user.id, aiId });
    }

    return preparedMembers;
};

const generateProjectRecommendations = async ({
    projectId,
    tags,
    teamSize,
    pinnedMemberIds = [],
    excludeUserIds = [],
}) => {
    await rehydrateIfNeeded();

    const candidates = await prepareProjectCandidates(projectId);

    const filteredCandidates = candidates.filter(
        (c) => !excludeUserIds.includes(c.realUserId)
    );

    const searchMemberIds = filteredCandidates.map((c) => c.aiId);

    const aiProjectId = await getOrCreateAIId(projectId, "PROJECT");
    await aiService.syncProject({ id: aiProjectId, tags });

    const result = await aiService.getRecommendations({
        projectId: aiProjectId,
        tags,
        searchMemberIds,
        teamSize,
        pinnedMemberIds,
    });

    const convertedTeams = [];
    for (const team of result.recommended_teams) {
        const realMembers = [];
        for (const aiId of team) {
            const realUserId = await getRealEntityId(aiId);
            realMembers.push(realUserId);
        }
        convertedTeams.push(realMembers);
    }

    return convertedTeams;
};

const syncHackathonEntity = async (hackathonId) => {
    const aiId = await getOrCreateAIId(hackathonId, "PROJECT");
    await aiService.syncProject({ id: aiId, tags: [] });
};


module.exports = {
    rehydrateIfNeeded,
    prepareHackathonCandidates,
    generateHackathonRecommendations,
    prepareProjectCandidates,
    generateProjectRecommendations,
    syncHackathonEntity,
};