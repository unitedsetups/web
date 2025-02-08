import { Injectable, signal } from '@angular/core';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  user = signal<User | undefined>(undefined);
  constructor() {}
}
