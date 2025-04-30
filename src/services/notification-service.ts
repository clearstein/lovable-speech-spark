
import { Notification } from "@/types/notification";
import { supabase } from "@/integrations/supabase/client";

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
    
    return data as Notification[];
  } catch (error) {
    console.error("Exception fetching notifications:", error);
    return [];
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  } catch (error) {
    console.error("Exception marking notification as read:", error);
    throw error;
  }
}

export async function createNotification(notification: Partial<Notification>): Promise<Notification> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: notification.user_id || '',
        title: notification.title || 'New Notification',
        message: notification.message || '',
        type: notification.type || 'info',
        is_read: false,
        link: notification.link
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
    
    return data as Notification;
  } catch (error) {
    console.error("Exception creating notification:", error);
    throw error;
  }
}

export async function deleteNotification(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  } catch (error) {
    console.error("Exception deleting notification:", error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  } catch (error) {
    console.error("Exception marking all notifications as read:", error);
    throw error;
  }
}
