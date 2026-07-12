import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../api/notificationApi";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const [notificationRes, unreadRes] = await Promise.all([
        getNotifications(),
        getUnreadCount(),
      ]);

      setNotifications(notificationRes.notifications || []);

      setUnreadCount(unreadRes.count ?? unreadRes.unread ?? 0);
    } catch (error) {
      console.error("Notification Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    await refreshNotifications();
  };

  const handleDeleteNotification = async (id) => {
    await deleteNotification(id);
    await refreshNotifications();
  };

  const handleClearNotifications = async () => {
    await clearNotifications();
    await refreshNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,

        refreshNotifications,

        markAllRead: handleMarkAllRead,

        deleteNotification: handleDeleteNotification,

        clearAllNotifications: handleClearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
