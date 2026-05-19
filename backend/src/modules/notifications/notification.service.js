// src/modules/notifications/notification.service.js
const notificationRepository = require("./notification.repository");
const AppError = require("../../utils/AppError");

const getUserNotifications = async (userId, page, limit) => {
  return notificationRepository.findByUserId(userId, page, limit);
};

const markNotificationAsRead = async (notificationId, userId) => {
  const result = await notificationRepository.markAsRead(notificationId, userId);
  if (result.count === 0) throw new AppError("Notification not found", 404);
  return { success: true };
};

const markAllNotificationsAsRead = async (userId) => {
  await notificationRepository.markAllAsRead(userId);
  return { success: true };
};

const getUnreadCount = async (userId) => {
    return notificationRepository.countUnread(userId);
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount,
};