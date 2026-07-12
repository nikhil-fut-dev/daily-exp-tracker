import API from "./axios";

// Get All Notifications
export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};

// Get Unread Count
export const getUnreadCount = async () => {
  const res = await API.get("/notifications/unread-count");
  return res.data;
};

// Mark One As Read
export const markAsRead = async (id) => {
  const res = await API.patch(`/notifications/${id}/read`);
  return res.data;
};

// Mark All As Read
export const markAllAsRead = async () => {
  const res = await API.patch("/notifications/read-all");
  return res.data;
};

// Delete One Notification
export const deleteNotification = async (id) => {
  const res = await API.delete(`/notifications/${id}`);
  return res.data;
};

// Clear All Notifications
export const clearNotifications = async () => {
  const res = await API.delete("/notifications");
  return res.data;
};
