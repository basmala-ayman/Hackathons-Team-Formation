import api from "./axiosInstance";

/**
 * Fetch notifications with pagination support
 */
export const getMyNotifications = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(
      `/notifications?page=${page}&limit=${limit}`,
    );
    return {
      notifications: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch notifications!";
  }
};

/**
 * Get count of unread notifications
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get("/notifications/unread-count");
    return response.data?.data?.count || 0;
  } catch (error) {
    throw error.response?.data || "Failed to fetch unread count!";
  }
};

/**
 * Mark a specific notification as read
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to mark as read!";
  }
};

/**
 * Mark all user notifications as read
 */
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await api.put("/notifications/read-all");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to mark all as read!";
  }
};
