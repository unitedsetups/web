import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { endpoints } from '../../constants/api-endpoints.constants';
import {
  RegisterRequestType,
  SignInRequestType,
} from '../../types/auth-request.type';
import { AuthResponseType } from '../../types/auth-response.type';
import { IAuthService } from '../../interfaces/auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private readonly _httpClient = inject(HttpClient);

  authenticated = signal<boolean>(false);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   *
   * @param credentials
   */
  async signIn(
    credentials: SignInRequestType
  ): Promise<AuthResponseType | undefined> {
    if (this.authenticated()) {
      return undefined;
    }

    return await lastValueFrom(
      this._httpClient.post<AuthResponseType>(endpoints.signIn, credentials)
    );
  }

  /**
   * Sign out
   */
  signOut(): boolean {
    localStorage.removeItem('accessToken');
    this.authenticated.set(false);
    return true;
  }

  /**
   * Sign up
   *
   * @param user
   */
  async signUp(
    user: RegisterRequestType
  ): Promise<AuthResponseType | undefined> {
    return await lastValueFrom(
      this._httpClient.post<AuthResponseType>(endpoints.signUp, user)
    );
  }
}
