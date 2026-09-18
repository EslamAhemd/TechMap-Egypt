export interface IOpportunity {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLogoTheme: 'light' | 'dark';
  location: string;
  postedLabel: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  experienceLevel: string;
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  description: string;
  salary: string;
  skills: string[];
}
