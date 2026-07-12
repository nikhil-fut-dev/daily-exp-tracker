const Notification = require("../models/Notification");

/**
 * Create Notification
 */
const createNotification = async ({
  user,
  type,
  module,
  title,
  message,
  priority = "medium",
  actionUrl = "",
  metadata = {},
}) => {
  return await Notification.create({
    user,
    type,
    module,
    title,
    message,
    priority,
    actionUrl,
    metadata,
  });
};

/**
 * Create Notification Only If Not Exists
 * Duplicate check based on:
 * user + type + module + metadata
 */
const createNotificationIfNotExists = async ({
  user,
  type,
  module,
  title,
  message,
  priority = "medium",
  actionUrl = "",
  metadata = {},
}) => {
  const existing = await Notification.findOne({
    user,
    type,
    module,
    isRead: false,
  }).sort({
    createdAt: -1,
  });

  if (existing) {
    const oldMeta = JSON.stringify(existing.metadata || {});
    const newMeta = JSON.stringify(metadata || {});

    if (
      existing.title === title &&
      existing.message === message &&
      oldMeta === newMeta
    ) {
      return existing;
    }
  }

  return await Notification.create({
    user,
    type,
    module,
    title,
    message,
    priority,
    actionUrl,
    metadata,
  });
};

/**
 * Get User Notifications
 */
const getNotifications = async (userId) => {
  return await Notification.find({
    user: userId,
  }).sort({
    isRead: 1,
    createdAt: -1,
  });
};

/**
 * Get Unread Count
 */
const getUnreadCount = async (userId) => {
  return await Notification.countDocuments({
    user: userId,
    isRead: false,
  });
};

/**
 * Mark One As Read
 */
const markAsRead = async (id, userId) => {
  return await Notification.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    },
  );
};

/**
 * Mark All As Read
 */
const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      isRead: true,
    },
  );
};

/**
 * Delete One Notification
 */
const deleteNotification = async (id, userId) => {
  return await Notification.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

/**
 * Delete All Notifications
 */
const clearNotifications = async (userId) => {
  return await Notification.deleteMany({
    user: userId,
  });
};

module.exports = {
  createNotification,
  createNotificationIfNotExists,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
};
