
export interface Therapist {
  id: string;
  name: string;
  email: string;
  license?: string;
  specialty?: string;
  active: boolean;
  created_at: string;
}

export interface CreateTherapistData {
  name: string;
  email: string;
  password: string;
  license?: string;
  specialty?: string;
  active?: boolean;
}

export interface UpdateTherapistData {
  id: string;
  name?: string;
  email?: string;
  license?: string;
  specialty?: string;
  active?: boolean;
}
