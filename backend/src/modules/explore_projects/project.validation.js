// project.validation.js
const Joi = require("joi");

const projectParam = Joi.object({
  projectId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": "The path variable projectId must match a structural UUIDv4 configuration string",
      "any.required": "Required structural target project identification parameter is missing"
    })
});

module.exports = { projectParam };