import { useEffect, useState, useCallback } from "react";

import { getNotifications, getUnreadCount } from "../api/notificationApi";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
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
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    refreshNotifications: fetchNotifications,
  };
}
