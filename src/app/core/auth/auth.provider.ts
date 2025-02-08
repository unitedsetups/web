import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
  return [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideEnvironmentInitializer(() => inject(AuthService)),
  ];
};
