const userService = require("./user.service");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const fs = require("fs");
const path = require("path");


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

const getUserProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profileData = await userService.getBasicUserInfo(userId);
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: profileData
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {

    if (req.files?.profilePicture?.[0]) {
      const cloudinaryResult = await uploadToCloudinary(req.files.profilePicture[0].buffer, "profile_pictures");

      req.body.profilePicture = cloudinaryResult;

    } else if (req.body.profilePicture === "" || req.body.profilePicture === "null") {
      delete req.body.profilePicture;
    }


    const resumeFile = req.files?.resume?.[0];
    if (resumeFile) {
      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(resumeFile.originalname);
      const filePath = path.join("uploads", "resumes", uniqueName);
      fs.writeFileSync(filePath, resumeFile.buffer); // save buffer
      req.body.resumeUrl = `/uploads/resumes/${uniqueName}`;
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
  getHackathonInterests,
  getUserProfileById
};