// user.controller.js

const userService = require("./user.service");

const getProfile = async (req, res, next) => {
  try {
    const profileData = await userService.getProfile(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Profile data fetched successfully",
      data: profileData
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    // profile picture upload
    if (req.files?.profilePicture) {
      req.body.profilePicture =
        `/uploads/profile-pictures/${req.files.profilePicture[0].filename}`;
    }

    // resume upload
    if (req.files?.resume) {
      req.body.resumeUrl =
        `/uploads/resumes/${req.files.resume[0].filename}`;
    }

    // convert skills if frontend sends strings
    if (req.body.hardSkills && typeof req.body.hardSkills === "string") {
      req.body.hardSkills = [req.body.hardSkills];
    }

    if (req.body.softSkills && typeof req.body.softSkills === "string") {
      req.body.softSkills = [req.body.softSkills];
    }

    const updatedProfileData = await userService.updateProfile(
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfileData
    });
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const users = await userService.searchUsers(
      req.query.q,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

const getUsersBasicList = async (req, res, next) => {
  try {
    const users = await userService.getUsersBasicList(req.user.userId);

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
  getUsersBasicList
};