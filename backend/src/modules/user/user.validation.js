const Joi = require("joi");

const updateProfile = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  bio: Joi.string().max(500).allow("", null).optional(),
  githubUrl: Joi.string().uri().allow("", null).optional(),
  linkedinUrl: Joi.string().uri().allow("", null).optional(),
  profilePicture: Joi.string().allow("", null).optional(),
  resumeUrl: Joi.string().allow("", null).optional(),

  techRoles: Joi.array()
    .items(Joi.string().max(50))
    .unique()
    .allow(null)
    .optional(),

  hardSkills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),

  softSkills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),

  hackathonInterests: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional()
});

module.exports = {
  updateProfile
};