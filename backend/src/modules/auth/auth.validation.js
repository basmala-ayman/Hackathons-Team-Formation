const Joi=require("joi");

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
  email: Joi.string().email().required(),

  otp: Joi.string()
    .length(6)
    .required()
    .messages({
      "string.length": "OTP must be 6 digits",
      "string.empty": "OTP is required",
    }),
});



const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});


module.exports = {
  registerSchema,
  verifyEmailSchema,
  resendVerificationSchema,
};