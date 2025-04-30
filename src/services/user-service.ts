
import { UserSettings } from "@/types/user-settings";

// Mock data for user settings
const mockUserSettings: Record<string, UserSettings> = {
  "1": {
    user_id: "1",
    theme: "light",
    notifications_enabled: true,
    language: "en",
    updated_at: new Date().toISOString()
  }
};

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockUserSettings[userId] || null), 200);
  });
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  // Simulate API call
  return new Promise(resolve => {
    const userId = settings.user_id!;
    const existingSettings = mockUserSettings[userId] || {
      user_id: userId,
      theme: "light",
      notifications_enabled: true,
      language: "en",
      updated_at: new Date().toISOString()
    };

    const updatedSettings: UserSettings = {
      ...existingSettings,
      ...settings,
      updated_at: new Date().toISOString()
    };

    mockUserSettings[userId] = updatedSettings;
    setTimeout(() => resolve(updatedSettings), 200);
  });
}

export async function createUserIfNotExists(userId: string, userSettings: Partial<UserSettings>): Promise<UserSettings> {
  // Simulate API call
  return new Promise(resolve => {
    if (!mockUserSettings[userId]) {
      mockUserSettings[userId] = {
        user_id: userId,
        theme: userSettings.theme || "light",
        notifications_enabled: userSettings.notifications_enabled ?? true,
        language: userSettings.language || "en",
        updated_at: new Date().toISOString()
      };
    }
    setTimeout(() => resolve(mockUserSettings[userId]), 200);
  });
}
