import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/user.type';
import { IUserStoreService } from '../../interfaces/user-store-service.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { endpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService implements IUserStoreService {
  private readonly _httpClient = inject(HttpClient);

  user = signal<User | undefined>(undefined);

  constructor() {}

  async getAuthenticatedUser(): Promise<void> {
    const userResponse = await lastValueFrom(
      this._httpClient.get<User>(endpoints.user_me)
    );
    this.user.set(userResponse);
  }
}
