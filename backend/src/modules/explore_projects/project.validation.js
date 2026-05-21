// project.validation.js
const Joi = require("joi");

const projectParam = Joi.object({
  projectId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": "The project ID in the path must be a valid UUIDv4",
      "any.required": "Project ID parameter is missing from the URL path"
    })
});

module.exports = { 
  projectParam 
};