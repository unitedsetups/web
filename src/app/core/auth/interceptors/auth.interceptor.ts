import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const newReq = authService.accessToken
    ? req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${authService.accessToken}`
        ),
      })
    : req.clone();

  return next(newReq).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Sign out
        authService.signOut();

        // Reload the app
        location.reload();
      }

      return throwError(error);
    })
  );
};
