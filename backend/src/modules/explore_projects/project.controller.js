const projectService = require("./project.service");

const getExploreProjects = async (req, res, next) => {
  try {
    const data = await projectService.getAllExploreProjects();

    res.status(200).json({
      success: true,
      message: "All projects fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

const toggleInterest = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const authUserId =
      req.user?.id ||
      req.user?.userId ||
      req.user?._id;

    const result = await projectService.registerProjectInterest(
      projectId,
      authUserId
    );

    res.status(200).json({
      success: true,
      message: "Interest successfully registered for this project",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExploreProjects,
  toggleInterest
};