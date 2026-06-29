const Joi = require("joi");

const updateProfile = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  bio: Joi.string().max(500).allow("", null).optional(),
  githubUrl: Joi.string().uri().allow("", null).optional(),
  linkedinUrl: Joi.string().uri().allow("", null).optional(),

  // FIX: Change from Joi.string() to Joi.any() to stop crashing on multipart form file objects
  profilePicture: Joi.any().optional(),
  resume: Joi.any().optional(),
  resumeUrl: Joi.any().optional(),

  techRoles: Joi.array()
    .items(Joi.string().max(50))
    .unique()
    .allow(null)
    .optional(),

  // Unified single array handling all skills
  skills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),

  // Static Enum/Text based interests (saves to User.IntrestedHackathons)
  intrestes: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),

  // DB-Backed real records mapping (saves via HackathonInterest relation)
  hackathonInterests: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional()
});

module.exports = {
  updateProfile
};