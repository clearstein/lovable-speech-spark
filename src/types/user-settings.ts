
export interface UserSettings {
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  language: string;
  accessibility_settings?: any;
  updated_at: string;
}
