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
   
    if (req.files?.profilePicture?.[0]) {
      req.body.profilePicture = `/uploads/profile-pictures/${req.files.profilePicture[0].filename}`;
    } else if (req.body.profilePicture === "" || req.body.profilePicture === "null") {
      delete req.body.profilePicture;
    }
    const resumeFile = req.files?.resume?.[0] || req.files?.resumeUrl?.[0];
    if (resumeFile) {
      req.body.resumeUrl = `/uploads/resumes/${resumeFile.filename}`;
    } else if (req.body.resumeUrl === "" || req.body.resumeUrl === "null") {
      delete req.body.resumeUrl;
    }

    delete req.body.resume;
    const parseFormArray = (field) => {
      if (!field || field === "null") return undefined;
      if (Array.isArray(field)) return field;
      if (typeof field === "string") {
        return field.split(",").map(item => item.trim()).filter(Boolean);
      }
      return [field];
    };

    if (req.body.techRoles) req.body.techRoles = parseFormArray(req.body.techRoles);
    if (req.body.skills) req.body.skills = parseFormArray(req.body.skills);
    if (req.body.intrestes) req.body.intrestes = parseFormArray(req.body.intrestes);
    if (req.body.hackathonInterests) req.body.hackathonInterests = parseFormArray(req.body.hackathonInterests);

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

const getHackathonInterests = async (req, res, next) => {
  try {
    const data = await userService.getHackathonInterests(req.user.userId);

    res.status(200).json({
      success: true,
      data
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
  getUsersBasicList,
  getHackathonInterests
};