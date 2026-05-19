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
    const updatedProfileData = await userService.updateProfile(req.user.id, req.body);
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
    const users = await userService.searchUsers(req.query.q, req.user.id);
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
  searchUsers
};