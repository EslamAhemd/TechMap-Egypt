export interface IApplication {
  id: string;
  opportunityTitle: string;
  fullName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  resumeLink: string;
  coverLetter: string;
  submittedAt: string;
  status?: 'Pending' | 'Reviewed' | 'Rejected' | 'Accepted';
}