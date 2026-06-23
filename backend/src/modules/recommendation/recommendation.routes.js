const express = require("express");
const router = express.Router();
const recommendationController = require("./recommendation.controller");
const { protect } = require("../../middlewares/auth.middleware");

router.use(protect);

// GET  /api/v1/recommendations?tab=my-teams|join|all
router.get("/", recommendationController.getRecommendations);


//this for the view team button
router.get("/:id",recommendationController.getRecommendationDetails);


router.patch(
    "/invitations/:invitationId/respond",
    recommendationController.respondToInvitation
);

router.patch("/:id/accept", recommendationController.acceptRecommendation);

router.patch("/:id/reject", recommendationController.rejectRecommendation);




module.exports = router;