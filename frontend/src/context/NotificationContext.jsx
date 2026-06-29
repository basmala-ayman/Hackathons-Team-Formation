import { createContext, useContext, useState, useEffect } from "react";
import { getUnreadCount } from "../services/notificationService";
import { useAuth } from "./AuthContext/useAuth";
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  const refreshUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      refreshUnreadCount();
    }
  }, [user]);

  useEffect(() => {
    console.log("Context unreadCount:", unreadCount);
  }, [unreadCount]);

  const markOneAsReadLocally = () => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearUnreadLocally = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        refreshUnreadCount,
        markOneAsReadLocally,
        clearUnreadLocally,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  return useContext(NotificationContext);
};