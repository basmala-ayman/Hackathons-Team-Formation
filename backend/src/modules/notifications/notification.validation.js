// src/modules/notifications/notification.validation.js
const Joi = require("joi");

const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});

module.exports = { idParamSchema, paginationQuerySchema };