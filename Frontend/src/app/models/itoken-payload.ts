export interface ItokenPayload {
  id: string;
  email: string;
  role: 'JobSeeker' | 'Employer' | 'Admin';
  iat?: number;
  exp?: number;
}