import { GUID } from './common.type';
import { Roles } from './role.type';

export type User = {
  id: GUID;
  username: string;
  email: string;
  name: string;
  telegramId: string;
  profileImageUrl: string;
  profileImageThumbnailUrl: string;
  coverImageUrl: string;
  coverImageThumbnailUrl: string;
  role: Roles;
};
