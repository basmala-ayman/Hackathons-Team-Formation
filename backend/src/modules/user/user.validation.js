const Joi = require("joi");

const updateProfile = Joi.object({
  name: Joi.string().min(3).max(50),
  bio: Joi.string().allow("", null),
  githubUrl: Joi.string().uri().allow("", null),
  linkedinUrl: Joi.string().uri().allow("", null),
  profilePicture: Joi.string().allow("", null),
  resumeUrl: Joi.string().allow("", null)
});

module.exports = {
  updateProfile
};