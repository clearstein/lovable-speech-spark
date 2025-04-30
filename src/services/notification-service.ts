
import { Notification } from "@/types/notification";

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    user_id: "1",
    title: "New exercise assigned",
    message: "Your therapist has assigned a new exercise for you to complete.",
    type: "info",
    is_read: false,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "1",
    title: "Progress update",
    message: "You've completed 70% of your assigned exercises this week!",
    type: "success",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "3",
    user_id: "1",
    title: "Reminder",
    message: "Don't forget to practice your daily exercises.",
    type: "warning",
    is_read: false,
    created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  // Simulate API call with mock data
  return new Promise(resolve => {
    const userNotifications = mockNotifications.filter(notification => notification.user_id === userId);
    setTimeout(() => resolve(userNotifications), 300);
  });
}

export async function markNotificationAsRead(id: string): Promise<void> {
  // Simulate API call
  return new Promise(resolve => {
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.is_read = true;
    }
    setTimeout(() => resolve(), 200);
  });
}

export async function createNotification(notification: Partial<Notification>): Promise<Notification> {
  // Simulate API call
  return new Promise(resolve => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(7),
      user_id: notification.user_id || "1",
      title: notification.title || "New Notification",
      message: notification.message || "",
      type: notification.type || "info",
      is_read: false,
      created_at: new Date().toISOString(),
      link: notification.link
    };
    mockNotifications.push(newNotification);
    setTimeout(() => resolve(newNotification), 200);
  });
}

export async function deleteNotification(id: string): Promise<void> {
  // Simulate API call
  return new Promise(resolve => {
    const index = mockNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      mockNotifications.splice(index, 1);
    }
    setTimeout(() => resolve(), 200);
  });
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  // Simulate API call
  return new Promise(resolve => {
    mockNotifications.forEach(notification => {
      if (notification.user_id === userId && !notification.is_read) {
        notification.is_read = true;
      }
    });
    setTimeout(() => resolve(), 200);
  });
}
