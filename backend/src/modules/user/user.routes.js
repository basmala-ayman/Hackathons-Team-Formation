const express = require("express");
const router = express.Router();

const controller = require("./user.controller");
const validate = require("../../middlewares/validate.middleware");
const schema = require("./user.validation");
const { protect } = require("../../middlewares/auth.middleware");
const { uploadProfilePicture, uploadResume } = require("../../middlewares/upload.middleware");

// GET current logged-in user profile & step completion states
router.get("/profile", protect, controller.getProfile);

// GET all users names and emails
router.get("/list/basic", protect, controller.getUsersBasicList);

// PUT update profile properties (Handles text inputs + hard/soft skills arrays)
router.put(
  "/profile",
  protect,
    (req, res, next) => {
        uploadProfilePicture.fields([{ name: "profilePicture", maxCount: 1 }])(req, res, (err) => {
            if (err) return next(err);
            uploadResume.fields([
                { name: "resume", maxCount: 1 },
                { name: "resumeUrl", maxCount: 1 },
            ])(req, res, next);
        });
    },
  validate(schema.updateProfile),
  controller.updateProfile
);

// GET search for platform users by name or email
router.get("/search", protect, controller.searchUsers);

module.exports = router;