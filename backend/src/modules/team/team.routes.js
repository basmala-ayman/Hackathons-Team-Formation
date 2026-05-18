// src/modules/team/team.routes.js
const express = require("express");
const router = express.Router();
const teamController = require("./team.controller");
const { createTeamSchema } = require("./team.validation");
const validate = require("../../middlewares/validate.middleware");
const { protect } = require("../../middlewares/auth.middleware");

// All routes in this router will require authentication so it must first to be entered in the protect
router.use(protect);

//this for creating team 
router.post("/", validate(createTeamSchema), teamController.createTeam);
//this is for getting specific team by its specify id
// router.get("/:id", validate(teamIdParamSchema, "params"), teamController.getTeam);

module.exports = router;