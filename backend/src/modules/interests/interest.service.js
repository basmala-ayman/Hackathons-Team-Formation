const interestRepository = require("./interest.repository");
const AppError = require("../../utils/AppError");
const matchingService = require("../matching/matching.service");

//this is the thresold that we send it to the ai model when re reach to it
const POOL_THRESHOLD = 30;//can be updated

// ── Hackathon Interest ────────────────────────────────────

const addHackathonInterest = async (userId, hackathonId) => {
    // 1. mutual exclusion  block if already a team owner for this hackathon
    //and that will be blocked too if the hackathon this user whoe created it
    const existingTeam = await interestRepository.findUserTeamForHackathon(userId, hackathonId);
    if (existingTeam) {
        throw new AppError("You already created a team for this hackathon. You cannot also mark yourself as interested.", 400);
    }

    // 2. block if already interested
    const existing = await interestRepository.findHackathonInterest(userId, hackathonId);
    if (existing) {
        throw new AppError("You are already interested in this hackathon.", 400);
    }

    // 3. save interest
    await interestRepository.createHackathonInterest(userId, hackathonId);

    // 4. increment and read new count from the returned record — no extra query
    const updated = await interestRepository.incrementHackathonInterestCount(hackathonId);

    return {
        message: "Interest registered successfully.",
        currentPoolSize: updated.interestCount,
        thresholdReached: updated.interestCount >= POOL_THRESHOLD,
        hackathonId,
    };
};

const removeHackathonInterest = async (userId, hackathonId) => {
    const existing = await interestRepository.findHackathonInterest(userId, hackathonId);
    if (!existing) {
        throw new AppError("You are not interested in this hackathon.", 404);
    }

    await interestRepository.deleteHackathonInterest(userId, hackathonId);
    await interestRepository.decrementHackathonInterestCount(hackathonId);

    return { message: "Interest removed successfully." };
};

// ── Project Interest ──────────────────────────────────────

const addProjectInterest = async (userId, projectId) => {
    // 1. check project exists
    const project = await interestRepository.findProject(projectId);
    if (!project) {
        throw new AppError("Project not found.", 404);
    }

    // 2. cannot be interested in your own project
    if (project.ownerId === userId) {
        throw new AppError("You cannot mark interest in your own project.", 400);
    }

    // 3. block if already interested
    const existing = await interestRepository.findProjectInterest(userId, projectId);
    if (existing) {
        throw new AppError("You are already interested in this project.", 400);
    }

    // 4. save interest
    await interestRepository.createProjectInterest(userId, projectId);

    // 5. increment and read new count from the returned record  no extra query
    const updated = await interestRepository.incrementProjectInterestCount(projectId);



    //here cause in the project each project with just one team so there is no need for
    //making the matching requests to the project team wait until 10 pm as hackathon
    //we will need just when the interested count reaches to 30 so we immediately trigger the ai model
    if (updated.interestsCount >= POOL_THRESHOLD) {
        matchingService
            .triggerProjectMatching(projectId)
            .catch((err) =>
                console.error("Project matching failed:", err.message)
            );
    }


    return {
        message: "Interest registered successfully.",
        currentPoolSize: updated.interestsCount,
        thresholdReached: updated.interestsCount >= POOL_THRESHOLD,
        projectId,
    };
};

const removeProjectInterest = async (userId, projectId) => {
    const existing = await interestRepository.findProjectInterest(userId, projectId);
    if (!existing) {
        throw new AppError("You are not interested in this project.", 404);
    }

    await interestRepository.deleteProjectInterest(userId, projectId);
    await interestRepository.decrementProjectInterestCount(projectId);

    return { message: "Interest removed successfully." };
};

module.exports = {
    addHackathonInterest,
    removeHackathonInterest,
    addProjectInterest,
    removeProjectInterest,
};