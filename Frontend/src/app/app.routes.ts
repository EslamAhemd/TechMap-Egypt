import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'TechMap Egypt'
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
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    title: 'Profile | TechMap Egypt'
  },
  {
    path: '**',
    redirectTo: ''
  }
];