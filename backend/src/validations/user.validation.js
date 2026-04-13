// const { body } = require("express-validator");

// exports.createUserValidation = [
//   body("name")
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2 })
//     .withMessage("Name must be at least 2 characters"),

//   body("email")
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Email must be valid"),
// ];



/**
 * we will use JOI package not teh express-validator one cause 
 * it is more scalable and more organized and will fit more in the complex projects 
 * like our one 
 * 
 * 
 * 
 * 
 * 
 */