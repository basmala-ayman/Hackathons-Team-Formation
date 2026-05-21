// project.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./project.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./project.validation");

router.get("/explore", controller.getExploreProjects);
router.post("/interest/:projectId", validate(schema.projectParam, "params"), controller.toggleInterest);

module.exports = router;