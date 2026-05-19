// src/modules/notifications/notification.routes.js
const express = require("express");
const router = express.Router();
const notificationController = require("./notification.controller");
const { idParamSchema, paginationQuerySchema } = require("./notification.validation");
const validate = require("../../middlewares/validate.middleware");
const { protect } = require("../../middlewares/auth.middleware");

router.use(protect);

router.get("/", validate(paginationQuerySchema, "query"), notificationController.getMyNotifications);
router.put("/read-all", notificationController.markAllAsRead);
router.put("/:id/read", validate(idParamSchema, "params"), notificationController.markAsRead);
router.get("/unread-count", notificationController.getUnreadCount);

module.exports = router;