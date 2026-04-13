// const express = require("express");
// const router = express.Router();

// // GET users
// router.get("/", (req, res) => {
//   res.send("Users route working ✅");
// });

// module.exports = router;
const express = require("express");
const  createUserController=require("../controllers/user.controller.js");
const  validate = require("../middlewares/validate.middleware.js");
//import { createUserSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post(
  "/",
//  validate(createUserSchema),
  createUserController
);

module.exports=router;