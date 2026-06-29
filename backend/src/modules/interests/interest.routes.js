const express = require("express");
const router = express.Router();
const interestController = require("./interest.controller");
const { protect } = require("../../middlewares/auth.middleware");

// all interest routes require login


//and all this steps need to ensure that the user is already completed its profile 
router.use(protect);

//  Hackathon interests ───────────────────────────────────

//now i am as an user i can press the interested button in specific hackathon 
// POST   /api/v1/interests/hackathons/:hackathonId
// DELETE /api/v1/interests/hackathons/:hackathonId
router.post("/hackathons/:hackathonId", interestController.addHackathonInterest);
router.delete("/hackathons/:hackathonId", interestController.removeHackathonInterest);

//  Project interests ─────────────────────────────────────
// POST   /api/v1/interests/projects/:projectId
// DELETE /api/v1/interests/projects/:projectId


//and the same for projects that the users make them 
router.post("/projects/:projectId", interestController.addProjectInterest);
router.delete("/projects/:projectId", interestController.removeProjectInterest);

module.exports = router;



//and mainly the difference between the user created hackathon and the user created project 
//is that the hackathon more than one user can make team for it but the user created project just one user make a team on it 