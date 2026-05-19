const express = require("express");
const router = express.Router();

const controller = require("./user.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./user.validation");
const { protect } = require("../../middlewares/auth.middleware");

router.get("/profile", protect, controller.getProfile);


router.put(
  "/profile",
  protect,
  validate(schema.updateProfile),
  controller.updateProfile
);

module.exports = router;