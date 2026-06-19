const express = require("express");
const matchingController = require("./matching.controller");
const { protect } = require("../../middlewares/auth.middleware");


const router = express.Router();

//and we need here to add that the user need to be its file completed 
router.use(protect);

// POST /api/v1/matching/round2/:teamId
router.post("/round2/:teamId", matchingController.requestRound2);

// GET /api/v1/matching/ai-status
router.get("/ai-status", matchingController.getAIStatus);

router.post("/trigger-hackathon", async (req, res) => {
    try {
        await matchingService.triggerHackathonMatching();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;