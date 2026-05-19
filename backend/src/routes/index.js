///this is the centeral router for all other modules routers


const express = require("express");
const router = express.Router();

const userRoutes = require("../modules/user/user.routes");
const authRoutes= require("../modules/auth/auth.routes");
const hackathonRoutes = require("../modules/hackathons/hackathon.routes");
// const teamRoutes = require("../modules/team/team.routes");
// const notificationRoutes = require("../modules/notification/notification.routes");
const teamRoutes           = require("../modules/team/team.routes");
const notificationRoutes   = require("../modules/notifications/notification.routes");
const interestRoutes    = require("../modules/interests/interest.routes");
const matchingRoutes       = require("../modules/matching/matching.routes");
const recommendationRoutes = require("../modules/recommendation/recommendation.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");

//it making error so we will comment it until there is things be written there 
//router.use("/users", userRoutes);


router.use("/hackathons", hackathonRoutes);

router.use("/auth",authRoutes);

router.use("/users", userRoutes);
// router.use("/teams", teamRoutes);
// router.use("/notifications", notificationRoutes);/
router.use("/interests",     interestRoutes);
router.use("/dashboard", dashboardRoutes);


router.use("/teams",           teamRoutes);
router.use("/notifications",   notificationRoutes);
router.use("/matching",        matchingRoutes);
router.use("/recommendations", recommendationRoutes);

module.exports = router;









