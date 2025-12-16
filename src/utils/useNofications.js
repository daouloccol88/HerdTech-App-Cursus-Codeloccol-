"use client";
import { useState, useEffect } from "react";

export const useNotifications = () => {
  const [count, setCount] = useState(0);

  // Function to load notifications from localStorage
  const loadNotifications = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      setCount(0);
      return;
    }
    const saved = JSON.parse(localStorage.getItem("notifications") || "[]");
    const userNotification = saved.filter((n) => n.userId === user.id);
    setCount(userNotification.length);
  };

  // Update notifications in localStorage and notify listeners
  const addNotification = (notification) => {
    const saved = JSON.parse(localStorage.getItem("notifications") || "[]");
    saved.push(notification);
    localStorage.setItem("notifications", JSON.stringify(saved));
    window.dispatchEvent(new Event("notificationsUpdated"));
  };

  const removeNotification = (id) => {
    const saved = JSON.parse(localStorage.getItem("notifications") || "[]");
    const filtered = saved.filter((n) => n.id !== id);
    localStorage.setItem("notifications", JSON.stringify(filtered));
    window.dispatchEvent(new Event("notificationsUpdated"));
  };

  useEffect(() => {
    // Initial load
    loadNotifications();

    // Listen for updates from this tab
    const handler = () => loadNotifications();
    window.addEventListener("notificationsUpdated", handler);

    // Listen for cross-tab updates
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("notificationsUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { count, addNotification, removeNotification };
};
