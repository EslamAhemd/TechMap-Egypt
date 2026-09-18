import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { UserService } from '../services/user-service';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (!userService.isAdmin()) {
    return router.createUrlTree(['/']);
  }

  return true;
};