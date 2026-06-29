const recommendationService = require("./recommendation.service");

// GET /api/v1/recommendations?tab=my-teams|join|all
const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const tab = req.query.tab || "all";

        let data;

        if (tab === "my-teams") {
            data = await recommendationService.getMyTeamsTab(userId);
        } else if (tab === "join") {
            data = await recommendationService.getJoinTab(userId);
        } else {
            // "all" — return both so frontend can render all 3 tabs at once
            const [myTeams, join] = await Promise.all([
                recommendationService.getMyTeamsTab(userId),
                recommendationService.getJoinTab(userId),
            ]);
            data = { myTeams, join };
        }

        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

// PATCH /api/v1/recommendations/:id/accept
// founder accepts one recommended team → invitations sent
const acceptRecommendation = async (req, res, next) => {
    try {
        const result = await recommendationService.acceptRecommendation(
            req.params.id,
            req.user.userId
        );
        res.status(200).json({ success: true, message: result.message });
    } catch (err) {
        next(err);
    }
};

// PATCH /api/v1/recommendations/:id/reject
const rejectRecommendation = async (req, res, next) => {
    try {
        const result = await recommendationService.rejectRecommendation(
            req.params.id,
            req.user.userId
        );
        res.status(200).json({ success: true, message: result.message });
    } catch (err) {
        next(err);
    }
};

// PATCH /api/v1/recommendations/invitations/:invitationId/respond
// body: { action: "ACCEPT" | "REJECT" }
const respondToInvitation = async (req, res, next) => {
    try {
        const { action } = req.body;
        const result = await recommendationService.respondToInvitation(
            req.params.invitationId,
            req.user.userId,
            action
        );
        res.status(200).json({ success: true, message: result.message, data: result });
    } catch (err) {
        next(err);
    }
};


const getRecommendationDetails = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await recommendationService.getRecommendationDetails(
                req.params.id,
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getRecommendations,
    acceptRecommendation,
    rejectRecommendation,
    respondToInvitation,
    getRecommendationDetails,
};