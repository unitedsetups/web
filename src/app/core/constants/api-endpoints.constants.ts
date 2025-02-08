import { environment } from '../../../environments/environment';

const apiUrl = environment.API_URL;
const authApiUrl = `${apiUrl}/auth`;
const usersApiUrl = `${apiUrl}/users`;

export const endpoints = {
  signIn: `${authApiUrl}/login`,
  signUp: `${authApiUrl}/register`,
  user_me: `${usersApiUrl}/me`,
};
