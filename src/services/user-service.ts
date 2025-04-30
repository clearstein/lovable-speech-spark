
import { supabase } from "@/integrations/supabase/client";
import { UserSettings } from "@/types/user-settings";

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', settings.user_id!)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function createUserIfNotExists(userId: string, userSettings: Partial<UserSettings>): Promise<UserSettings> {
  // Check if user settings exist
  const existing = await getUserSettings(userId);
  
  if (existing) {
    // Update if exists
    return updateUserSettings({
      ...existing,
      ...userSettings
    });
  } else {
    // Create if not exists
    const { data, error } = await supabase
      .from('user_settings')
      .insert([{
        user_id: userId,
        ...userSettings
      }])
      .select();
    
    if (error) throw error;
    return data[0];
  }
}
