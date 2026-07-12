import { useState } from "react";
import toast from "react-hot-toast";

import useNotifications from "../../../hooks/useNotifications";

import NotificationBell from "../../notification/NotificationBell";
import NotificationDrawer from "../../notification/NotificationDrawer";

import {
  markAllAsRead,
  deleteNotification,
} from "../../../api/notificationApi";

export default function NotificationDropdown() {
  const [openNotifications, setOpenNotifications] = useState(false);

  const { notifications, unreadCount, loading, refreshNotifications } =
    useNotifications();

  // Open Drawer
  const handleOpen = async () => {
    setOpenNotifications(true);

    // Drawer open hote hi latest notifications fetch
    await refreshNotifications();
  };

  // Close Drawer
  const handleClose = () => {
    setOpenNotifications(false);
  };

  // Mark All Read
  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();

      await refreshNotifications();

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notifications");
    }
  };

  // Delete One
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      await refreshNotifications();

      toast.success("Notification deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <>
      <NotificationBell unreadCount={unreadCount} onClick={handleOpen} />

      <NotificationDrawer
        open={openNotifications}
        onClose={handleClose}
        notifications={notifications}
        loading={loading}
        onMarkAllRead={handleMarkAllRead}
        onDelete={handleDelete}
      />
    </>
  );
}
