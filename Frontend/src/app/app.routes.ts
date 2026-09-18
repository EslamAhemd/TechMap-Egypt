import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { OpportunitiesPage } from './pages/opportunities/opportunities';
import { CompaniesPage } from './pages/companies/companies';
import { CompanyDetails } from './pages/company-details/company-details';
import { Apply } from './pages/apply/apply';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Home | TechMap Egypt'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login | TechMap Egypt'
  },
  {
    path: 'register',
    component: Register,
    title: 'Register | TechMap Egypt'
  },
  {
    path: 'opportunities',
    component: OpportunitiesPage,
    title: 'Opportunities | TechMap Egypt'
  },
  {
    path: 'companies',
    component: CompaniesPage,
    title: 'Companies | TechMap Egypt'
  },
  {
    path: 'companies/:id',
    component: CompanyDetails,
    title: 'Company Details | TechMap Egypt'
  },
  {
    path: 'apply',
    component: Apply,
    title: 'Apply | TechMap Egypt'
  },
  {
    path: '**',
    component: NotFound,
    title: 'Page Not Found | TechMap Egypt'
  }
];