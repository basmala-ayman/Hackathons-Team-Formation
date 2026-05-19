const express = require("express");
const router = express.Router();
const recommendationController = require("./recommendation.controller");
const { protect } = require("../../middlewares/auth.middleware");

router.use(protect);

// GET  /api/v1/recommendations?tab=my-teams|join|all
router.get("/", recommendationController.getRecommendations);

// ── IMPORTANT: /invitations/:id must come BEFORE /:id ────
// otherwise Express matches "invitations" as the :id param
// PATCH /api/v1/recommendations/invitations/:invitationId/respond
router.patch(
    "/invitations/:invitationId/respond",
    recommendationController.respondToInvitation
);

// PATCH /api/v1/recommendations/:id/accept
router.patch("/:id/accept", recommendationController.acceptRecommendation);

// PATCH /api/v1/recommendations/:id/reject
router.patch("/:id/reject", recommendationController.rejectRecommendation);

module.exports = router;