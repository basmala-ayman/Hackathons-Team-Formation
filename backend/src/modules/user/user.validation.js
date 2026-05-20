const Joi = require("joi");

const updateProfile = Joi.object({
  name: Joi.string().min(2).max(50),

  bio: Joi.string().max(500).allow("", null),

  githubUrl: Joi.string().uri().allow("", null),

  linkedinUrl: Joi.string().uri().allow("", null),

  // allow local paths OR URLs
  profilePicture: Joi.string().allow("", null),

  // allow local paths OR URLs
  resumeUrl: Joi.string().allow("", null),

  techRole: Joi.string().max(50).allow("", null),

  hardSkills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ),

  softSkills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  )
});

module.exports = {
  updateProfile
};