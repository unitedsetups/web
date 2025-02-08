import { WritableSignal } from '@angular/core';
import {
  RegisterRequestType,
  SignInRequestType,
} from '../types/auth-request.type';
import { AuthResponseType } from '../types/auth-response.type';

export interface IAuthService {
  authenticated: WritableSignal<boolean>;
  signIn: (
    credentials: SignInRequestType
  ) => Promise<AuthResponseType | undefined>;
  signOut: () => boolean;
  signUp: (user: RegisterRequestType) => Promise<AuthResponseType | undefined>;
}
