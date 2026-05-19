const Joi = require("joi");

const updateProfile = Joi.object({
  name: Joi.string().min(2).max(50),
  bio: Joi.string().max(500).allow("", null),
  githubUrl: Joi.string().uri().allow("", null),
  linkedinUrl: Joi.string().uri().allow("", null),
  profilePicture: Joi.string().uri().allow("", null),
  resumeUrl: Joi.string().uri().allow("", null),
  techRole: Joi.string().max(50).allow("", null),
  hardSkills: Joi.array().items(Joi.string().min(1)).unique(),
  softSkills: Joi.array().items(Joi.string().min(1)).unique()
});

module.exports = {
  updateProfile
};