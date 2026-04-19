///this is the centeral router for all other modules routers


const express = require("express");
const router = express.Router();

const userRoutes = require("../modules/user/user.routes");
const authRoutes= require("../modules/auth/auth.routes");
//it making error so we will comment it until there is things be written there 
//router.use("/users", userRoutes);



router.use("/auth",authRoutes);

module.exports = router;