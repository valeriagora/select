import { NextRouter } from 'next/router';

export const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
export const ID_KEY = 'sub';

export const getCurrentUserRole = () => {
  const token = getAuthToken();
  if (!token) {
    return '';
  }
  const payload = getJwtPayload(token);
  return payload[ROLE_KEY];
};

export const getAuthToken = () => localStorage.getItem('WatchedJwtAuthToken') ?? '';
export const setAuthToken = (accessToken: string) => {
  localStorage.setItem('WatchedJwtAuthToken', accessToken);
};

export const getRefreshToken = () => localStorage.getItem('WatchedJwtRefreshToken');

export const Roles = Object.freeze({
  User: 'FocusGroupParticipant',
  Admin: 'Admin',
  FocusGroupManager: 'FocusGroupManager',
});

export const removeAuthToken = () => localStorage.removeItem('WatchedJwtAuthToken');

export async function handleUserLoggedIn(accessToken: string, router: NextRouter) {
  setAuthToken(accessToken);
  if (getCurrentUserRole() === Roles.FocusGroupManager || getCurrentUserRole() === Roles.Admin) {
    await router.push('/manager/scenarios');
  } else if (accessToken) {
    await router.push('/me');
  }
}

export const getJwtPayload = (token: string) => {
  const base64body = token.split('.')[1];
  const base64 = base64body.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};
