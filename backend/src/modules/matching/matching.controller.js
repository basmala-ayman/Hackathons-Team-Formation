const matchingService = require("./matching.service");
const aiService = require("../ai/ai.service");

// POST /api/v1/matching/round2/:teamId
// founder requests new recommendations for remaining open slots
const requestRound2 = async (req, res, next) => {
    try {
        const founderId = req.user.userId;
        const { teamId } = req.params;

        const result = await matchingService.triggerRound2(teamId, founderId);

        res.status(200).json({
            success: true,
            message: "Round 2 is being processed. You will be notified when recommendations are ready.",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/v1/matching/ai-status
// check if AI memory is alive — useful for debugging
const getAIStatus = async (req, res, next) => {
    try {
        const status = await aiService.getStatus();
        res.status(200).json({ success: true, data: status });
    } catch (err) {
        next(err);
    }
};

module.exports = { requestRound2, getAIStatus };