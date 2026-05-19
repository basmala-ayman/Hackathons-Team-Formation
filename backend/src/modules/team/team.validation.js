const Joi = require("joi");

const createTeamSchema = Joi.object({
    teamName: Joi.string().min(3).max(100).required(),

    hackathonName: Joi.string().trim().min(2).required(),

    description: Joi.string().max(500).allow("").optional(),

    teamSize: Joi.number().integer().min(2).max(6).required(),

    members: Joi.array()
        .items(Joi.string().uuid())
        .default([]),

    skills: Joi.array()
        .items(Joi.string().trim().min(1))
        .default([]),

    roles: Joi.array()
        .items(Joi.string().trim().min(1))
        .default([]),

        //and they will be optional cause maybe the user enter the project idea he want 
    // projectTitle: Joi.string().min(3).max(100).optional(),
    // projectDescription: Joi.string().max(1000).optional(),


    userCreated: Joi.boolean().default(false),
});

module.exports = { createTeamSchema };