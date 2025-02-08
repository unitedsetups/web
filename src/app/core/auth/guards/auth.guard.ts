import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { IAuthService } from '../../interfaces/auth-service.interface';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: IAuthService = inject(AuthService);

  if (!authService.authenticated()) {
    const redirectURL =
      state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
    return router.parseUrl(`sign-in?${redirectURL}`);
  }

  return true;
};
