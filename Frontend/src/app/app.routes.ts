// import { Routes } from '@angular/router';
// import { Login } from './components/login/login';
// import { Register } from './components/register/register';

// export const routes: Routes = [
//     // { path: '', redirectTo: 'home', pathMatch: 'full' },


//         {path :'login', component: Login},
//         {path :'register', component: Register}



//     // { path: '**', component: NotFound },

// ];

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
    path: '**',
    redirectTo: ''
  }
];