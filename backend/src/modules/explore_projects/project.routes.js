const express = require("express");
const router = express.Router();
const controller = require("./project.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./project.validation");
const { protect , optionalAuth} = require("../../middlewares/auth.middleware");

router.get("/explore", optionalAuth, controller.getExploreProjects);

// router.post(
//   "/interest/:projectId",
//   protect,
//   validate(schema.projectParam, "params"),
//   controller.toggleInterest
// );

module.exports = router;