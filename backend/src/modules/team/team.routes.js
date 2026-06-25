// src/modules/team/team.routes.js
const express = require("express");
const router = express.Router();
const teamController = require("./team.controller");
const { createTeamSchema } = require("./team.validation");
const validate = require("../../middlewares/validate.middleware");
const { protect } = require("../../middlewares/auth.middleware");

// All routes in this router will require authentication so it must first to be entered in the protect
router.use(protect);


//for getting all my teams accepted ones to show them there 
router.get("/my-teams", teamController.getMyTeams);

//get specific team by its id
router.get("/:id", teamController.getTeam);


//this for creating team 
router.post("/", validate(createTeamSchema), teamController.createTeam);


//this is for the get enoush button 
router.patch("/:id/finalize", teamController.finalizeTeam);

router.patch(
  "/invitations/:invitationId/respond",
  teamController.respondToInvitation
);

module.exports = router;