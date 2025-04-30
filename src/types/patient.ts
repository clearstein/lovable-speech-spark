
export interface Patient {
  id: string;
  name: string;
  email: string;
  date_of_birth?: string;
  therapist_id?: string;
  active: boolean;
  created_at: string;
}

export interface CreatePatientData {
  name: string;
  email: string;
  password: string;
  date_of_birth?: string;
  therapist_id?: string;
  active?: boolean;
}

export interface UpdatePatientData {
  id: string;
  name?: string;
  date_of_birth?: string;
  therapist_id?: string;
  active?: boolean;
}
