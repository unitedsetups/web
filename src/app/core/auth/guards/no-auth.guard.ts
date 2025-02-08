import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { IAuthService } from '../../interfaces/auth-service.interface';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  if (authService.authenticated() || authService.accessToken) {
    return router.parseUrl('');
  }
  return true;
};
