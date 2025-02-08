import { WritableSignal } from '@angular/core';
import { User } from '../types/user.type';

export interface IUserStoreService {
  user: WritableSignal<User | undefined>;
  getAuthenticatedUser: () => Promise<void>;
}
