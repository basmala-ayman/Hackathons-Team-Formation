// const Joi = require("joi");

// const createHackathonSchema = Joi.object({
//   title: Joi.string().min(3).max(100).required(),
//   description: Joi.string().optional(),
//   location: Joi.string().optional(),
//   applyLink: Joi.string().uri().required(),
//   prizeAmount: Joi.number().optional(),
//   startDate: Joi.date().optional(),
//   endDate: Joi.date().optional(),
//   tags: Joi.array().items(Joi.string()).optional(),
// });

// const updateHackathonSchema = Joi.object({
//   title: Joi.string().min(3).max(100).optional(),
//   description: Joi.string().optional(),
//   location: Joi.string().optional(),
//   applyLink: Joi.string().uri().optional(),
//   prizeAmount: Joi.number().optional(),
//   startDate: Joi.date().optional(),
//   endDate: Joi.date().optional(),
//   tags: Joi.array().items(Joi.string()).optional(),
// });

// module.exports = {
//   createHackathonSchema,
//   updateHackathonSchema,
// };