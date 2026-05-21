const express = require("express");
const router = express.Router();

const controller = require("./user.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./user.validation");
const { protect } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware");

// GET current logged-in user profile & step completion states
router.get("/profile", protect, controller.getProfile);

// GET all users names and emails
router.get("/list/basic", protect, controller.getUsersBasicList);

// PUT update profile properties (Handles text inputs + hard/soft skills arrays)
router.put(
  "/profile",
  protect,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },   
    { name: "resumeUrl", maxCount: 1 } 
  ]),
  validate(schema.updateProfile),
  controller.updateProfile
);

// GET search for platform users by name or email
router.get("/search", protect, controller.searchUsers);

module.exports = router;