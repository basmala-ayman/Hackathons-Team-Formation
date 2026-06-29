// const express = require("express");
// const router = express.Router();

// // GET users
// router.get("/", (req, res) => {
//   res.send("Users route working ✅");
// });

// module.exports = router;
import express from "express";
import { createUserController } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post(
  "/",
  validate(createUserSchema),
  createUserController
);

export default router;