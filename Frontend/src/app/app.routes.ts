import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

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
    path: '**',
    component: NotFound,
    title: 'Page Not Found | TechMap Egypt'
  }
];