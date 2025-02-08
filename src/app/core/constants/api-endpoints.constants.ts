import { environment } from '../../../environments/environment';

const apiUrl = environment.API_URL;

export const endpoints = {
  signIn: `${apiUrl}/auth/login`,
  signUp: `${apiUrl}/auth/register`,
};
