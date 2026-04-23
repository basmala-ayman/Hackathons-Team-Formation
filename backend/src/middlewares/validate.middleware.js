// const { validationResult } = require("express-validator");

// const validate = (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       errors: errors.array().map(err => ({
//         field: err.path,
//         message: err.msg,
//       })),
//     });
//   }

//   next();
// };

// module.exports = validate;

import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};