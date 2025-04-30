
import { UserSettings } from "@/types/user-settings";
import { supabase } from "@/integrations/supabase/client";

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }
    
    return data as UserSettings;
  } catch (error) {
    console.error("Exception fetching user settings:", error);
    return null;
  }
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: settings.user_id!,
        theme: settings.theme || 'light',
        notifications_enabled: settings.notifications_enabled ?? true,
        language: settings.language || 'en',
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error updating user settings:", error);
      throw error;
    }
    
    return data as UserSettings;
  } catch (error) {
    console.error("Exception updating user settings:", error);
    throw error;
  }
}

export async function createUserIfNotExists(userId: string, userSettings: Partial<UserSettings>): Promise<UserSettings> {
  try {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (!existingUser) {
      // Create new user settings
      const { data, error } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          theme: userSettings.theme || 'light',
          notifications_enabled: userSettings.notifications_enabled ?? true,
          language: userSettings.language || 'en'
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error creating user settings:", error);
        throw error;
      }
      
      return data as UserSettings;
    }
    
    return existingUser as UserSettings;
  } catch (error) {
    console.error("Exception in createUserIfNotExists:", error);
    throw error;
  }
}
