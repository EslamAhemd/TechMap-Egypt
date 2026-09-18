export interface ICompany {
  id: string;
  name: string;
  category: string;
  location: string;
  employees: string;
  logo: string;
  logoTheme: 'light' | 'dark' | 'blue';
  bannerImage: string;
  skills: string[];
}
