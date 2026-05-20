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
    // 1. Handle profile picture upload mapping
    if (req.files?.profilePicture) {
      req.body.profilePicture =
        `/uploads/profile-pictures/${req.files.profilePicture[0].filename}`;
    }

    // 2. Handle resume upload mapping
    if (req.files?.resume) {
      req.body.resumeUrl =
        `/uploads/resumes/${req.files.resume[0].filename}`;
    }

    // 3. Helper function to standardize incoming form-data arrays safely
    const parseFormArray = (field) => {
      if (!field) return undefined;
      if (Array.isArray(field)) return field;
      if (typeof field === "string") {
        return field.split(",").map(item => item.trim()).filter(Boolean);
      }
      return [field];
    };

    // 4. Transform all multi-option fields safely
    if (req.body.techRoles) req.body.techRoles = parseFormArray(req.body.techRoles);
    if (req.body.hardSkills) req.body.hardSkills = parseFormArray(req.body.hardSkills);
    if (req.body.softSkills) req.body.softSkills = parseFormArray(req.body.softSkills);
    if (req.body.hackathonInterests) req.body.hackathonInterests = parseFormArray(req.body.hackathonInterests);

    // 5. Fire off service logic
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

const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    const users = await userService.searchUsers(q, req.user.userId);

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