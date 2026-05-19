const Joi = require("joi");

//in this file the first problem that will face us in the growing that in each endpoint we will need to add schema validation here
//and to make it statuc and manually you will need to change in more than one file thats why using namign improvement here will be the good choice

//lets first writing the register validation

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
    }),
});



//now the second thing is to make the validation but for verify email validation
const verifyEmailSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),
});



const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});


const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});


const googleAuthSchema = Joi.object({
  token: Joi.string().required(),
});


const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).max(100).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(8).max(100).required().messages({
    "string.empty": "Password is required",
  }),
});


module.exports = {
  registerSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  refreshTokenSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginSchema,
};