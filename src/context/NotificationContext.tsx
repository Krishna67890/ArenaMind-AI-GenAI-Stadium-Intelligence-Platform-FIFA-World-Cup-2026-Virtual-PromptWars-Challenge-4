"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "match" | "weather" | "security" | "traffic" | "info" | "success";
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Initial FIFA 2026 Notifications
    const initial = [
      {
        id: "1",
        title: "Upcoming Match: USA vs Mexico",
        message: "Kickoff at Estadio Azteca in 2 hours. Expect high traffic around the stadium.",
        type: "match",
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: "2",
        title: "Weather Alert: Mexico City",
        message: "Heavy rain predicted for this evening. Stadium roof deployment scheduled.",
        type: "weather",
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: "3",
        title: "Security Update",
        message: "Enhanced AI surveillance active in North Concourse for maximum safety.",
        type: "security",
        timestamp: new Date().toISOString(),
        read: true
      }
    ];
    setNotifications(initial as Notification[]);

    // Infinite loop for new notifications every 1 minute
    const mockNotifs = [
      { title: "Traffic Update", message: "Congestion cleared on Route 66. Flow is back to normal.", type: "traffic" },
      { title: "AI Diagnostic", message: "Neural networks operating at 99.8% efficiency.", type: "info" },
      { title: "Fan Experience", message: "New AR filter unlocked for the ArenaVerse. Try it now!", type: "info" },
      { title: "Security Alert", message: "Unusual activity detected near Gate 3. AI response dispatched.", type: "security" },
      { title: "Goal Alert", message: "Goal! Brazil takes the lead in the virtual qualifying match.", type: "match" }
    ];

    const interval = setInterval(() => {
      const randomNotif = mockNotifs[Math.floor(Math.random() * mockNotifs.length)];
      addNotification(randomNotif as any);
    }, 15000); // 15 seconds for a more dynamic demo experience

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotif: Notification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Dispatch custom event for UI feedback
    window.dispatchEvent(new CustomEvent("new-notification", { detail: newNotif }));

    console.log("Notification added:", newNotif.title);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
