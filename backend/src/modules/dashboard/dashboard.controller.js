const dashboardService = require("./dashboard.service");

const getUserDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getUserDashboard(req.user.userId);

    res.status(200).json({
      success: true,
      message: "User dashboard fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getAdminDashboard();

    res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserDashboard,
  getAdminDashboard
};