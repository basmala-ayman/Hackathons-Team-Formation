// project.controller.js
const projectService = require("./project.service");

const getExploreProjects = async (req, res, next) => {
  try {
    const data = await projectService.getAllExploreProjects();
    res.status(200).json({
      success: true,
      message: "All user projects fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

const toggleInterest = async (req, res, next) => {
  try {
    // 💡 Read directly from path parameters instead of the body
    const { projectId } = req.params; 
    
    const result = await projectService.incrementProjectInterest(projectId);
    
    res.status(200).json({
      success: true,
      message: "Project interest count incremented successfully",
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