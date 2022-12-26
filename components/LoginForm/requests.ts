import { apiClient, isSuccess } from '../../utils/axios';
import { UserCredentials, LoginMode } from './slice';

type JwtAccessToken = string;

export async function requestAccessToken(creds: UserCredentials, mode: LoginMode): Promise<JwtAccessToken> {
  const loginResponse = await apiClient
    .post('api/users/login', {
      email: creds.email,
      [mode]: creds[mode],
    })
    .catch(async (err: any) => {
      const responseJson = err.response.data;
      switch (err.response.status) {
        case 400:
        case 401:
        case 404:
          if (err.message) {
            return await Promise.reject(responseJson.message);
          }
          return await Promise.reject(new Error('Bad request'));
        default:
          return await Promise.reject(new Error('Unexpected server error, please, try again later'));
      }
    });
  const responseJson = loginResponse.data;
  if (isSuccess(loginResponse.status)) {
    return responseJson.data as string;
  } else {
    return await Promise.reject(new Error('Unexpected error, please, try again later'));
  }
}
