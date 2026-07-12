const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} = require("../services/notification.service");

/**
 * GET /api/notifications
 */
exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotifications(req.user.id);

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/notifications/unread-count
 */
exports.getUnreadNotifications = async (req, res, next) => {
  try {
    const unread = await getUnreadCount(req.user.id);

    res.status(200).json({
      success: true,
      count: unread, // <-- count karo
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/notifications/:id/read
 */
exports.readNotification = async (req, res, next) => {
  try {
    const notification = await markAsRead(req.params.id, req.user.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/notifications/read-all
 */
exports.readAllNotifications = async (req, res, next) => {
  try {
    await markAllAsRead(req.user.id);

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/notifications/:id
 */
exports.removeNotification = async (req, res, next) => {
  try {
    const notification = await deleteNotification(req.params.id, req.user.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/notifications
 */
exports.clearAllNotifications = async (req, res, next) => {
  try {
    await clearNotifications(req.user.id);

    res.status(200).json({
      success: true,
      message: "All notifications cleared",
    });
  } catch (err) {
    next(err);
  }
};
