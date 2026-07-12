const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getAllNotifications,
  getUnreadNotifications,
  readNotification,
  readAllNotifications,
  removeNotification,
  clearAllNotifications,
} = require("../controllers/notification.controller");

// Protect All Routes
router.use(auth);

// GET
router.get("/", getAllNotifications);

// Unread Count
router.get("/unread-count", getUnreadNotifications);

// Mark One Read
router.patch("/:id/read", readNotification);

// Mark All Read
router.patch("/read-all", readAllNotifications);

// Delete One
router.delete("/:id", removeNotification);

// Delete All
router.delete("/", clearAllNotifications);

module.exports = router;
