import { useState } from "react";
import toast from "react-hot-toast";

import { useNotification } from "../../../context/NotificationContext";

import NotificationBell from "../../notification/NotificationBell";
import NotificationDrawer from "../../notification/NotificationDrawer";

export default function NotificationDropdown() {
  const [openNotifications, setOpenNotifications] = useState(false);

  const {
    notifications,
    unreadCount,
    loading,
    refreshNotifications,
    markAllRead,
    deleteNotification,
  } = useNotification();

  const handleOpen = async () => {
    setOpenNotifications(true);

    await refreshNotifications();
  };

  const handleClose = () => {
    setOpenNotifications(false);
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error(error);

      toast.error("Failed to mark notifications");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

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
