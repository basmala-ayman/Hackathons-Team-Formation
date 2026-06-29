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

const countUnread = (userId) => {
    return prisma.notification.count({ where: { userId, isRead: false } });
};


const findRecentNotification = async (userId, type, metadata, since) => {
    return prisma.notification.findFirst({
        where: {
            userId,
            type,
            metadata: { path: ['teamId'], equals: metadata.teamId },
            createdAt: { gte: since },
        },
    });
};

module.exports = {
  createNotifications,
  findByUserId,
  markAsRead,
  markAllAsRead,
  countUnread,
  findRecentNotification,
};