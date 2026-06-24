const express = require("express");
const router = express.Router();
const controller = require("./project.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./project.validation");
const { protect } = require("../../middlewares/auth.middleware");

router.get("/explore", controller.getExploreProjects);

// router.post(
//   "/interest/:projectId",
//   protect,
//   validate(schema.projectParam, "params"),
//   controller.toggleInterest
// );

module.exports = router;