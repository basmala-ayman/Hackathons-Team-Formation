const axios = require("axios");
const AppError = require("../../utils/AppError");
const config = require("../../config/env");

const AI_BASE_URL = config.ai.baseUrl;

//just checking if the memory of the ai model is still having data or no 
const getStatus = async () => {
    try {
        const response = await axios.get(`${AI_BASE_URL}/status`);
        return response.data;
    } catch (error) {
        console.log(error?.response?.data || error.message);
        throw new AppError("Failed To Get AI Status", 500);
    }
};

// ─────────────────────────────────────────────
// sync member into ai memory
// ─────────────────────────────────────────────
const syncMember = async (memberData) => {
    try {
        console.log(
            "SYNC MEMBER PAYLOAD:",
            JSON.stringify(memberData, null, 2)
        );
        const response = await axios.post(`${AI_BASE_URL}/sync/member`, memberData);
        return response.data;
    } catch (error) {
        console.error("Status:", error?.response?.status);
        console.error("Data:", error?.response?.data);

        throw new AppError("Failed To Sync Member With AI", 500);
    }
};

// ─────────────────────────────────────────────
// sync project into ai memory
// ─────────────────────────────────────────────
const syncProject = async (projectData) => {
    try {
        const response = await axios.post(`${AI_BASE_URL}/sync/project`, projectData);
        return response.data;
    } catch (error) {
        console.log(error?.response?.data || error.message);
        throw new AppError("Failed To Sync Project With AI", 500);
    }
};

// ─────────────────────────────────────────────
// request recommendation
// ─────────────────────────────────────────────
const getRecommendations = async ({
    projectId,
    tags,
    searchMemberIds,
    teamSize,
    pinnedMemberIds = [],
}) => {
    try {
        const response = await axios.post(`${AI_BASE_URL}/recommend`, {
            project_id: projectId,
            tags,
            search_member_ids: searchMemberIds,
            team_size: teamSize,
            pinned_member_ids: pinnedMemberIds,
        });
        return response.data.data;
    } catch (error) {
        console.log(error?.response?.data || error.message);
        throw new AppError("AI Recommendation Failed", 500);
    }
};



module.exports = {
    getStatus,
    syncMember,
    syncProject,
    getRecommendations,

};