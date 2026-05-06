const userService = require("./user.service");

const getProfile = async (req, res, next) => {
  try {
    const data = await userService.getProfile(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const data = await userService.updateProfile(req.user.userId, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile
};