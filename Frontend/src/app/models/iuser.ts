export interface Iuser {
  _id?: string;
  name: string;
  email: string;
  password?: string; // أكثر أمن
  role?: 'JobSeeker' | 'Employer' | 'Admin'; // واحد مهم فقط
}