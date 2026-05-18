// src/modules/notifications/notification.repository.js
const prisma = require("../../config/prisma");

const createNotifications = async (notificationsData) => {
  return prisma.notification.createMany({
    data: notificationsData,
  });
};

const findByUserId = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);
  return { notifications, total };
};

const markAsRead = async (notificationId, userId) => {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
};

const markAllAsRead = async (userId) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};

module.exports = {
  createNotifications,
  findByUserId,
  markAsRead,
  markAllAsRead,
};