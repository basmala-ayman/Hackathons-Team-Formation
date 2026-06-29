const express = require("express");
const router = express.Router();

const controller = require("./dashboard.controller");
const { protect, authorize } = require("../../middlewares/auth.middleware");

router.get("/user", protect, controller.getUserDashboard);
router.get("/admin", protect, authorize("ADMIN"), controller.getAdminDashboard);

module.exports = router;