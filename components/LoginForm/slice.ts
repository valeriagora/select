import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import router from 'next/router';
import { getCurrentUserRole, Roles, getAuthToken } from '../../utils/auth';

interface IPasswordCredentials {
  email: string;
  password: string;
}

export type UserCredentials = IPasswordCredentials;

export type LoginMode = 'password';

interface ILoginReducerState {
  isFetching: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
  creds?: UserCredentials;
}

export const initialState: ILoginReducerState = {
  isFetching: false,
  isAuthenticated: typeof window !== 'undefined' ? !!getAuthToken() : false,
  errorMessage: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    requestLogin(state) {
      state.isFetching = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state) {
      state.isFetching = false;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.isAuthenticated = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { actions, reducer } = loginSlice;
export const { requestLogin, loginSuccess, loginFailure } = actions;
export const onSuccessfulLogin = async (dispatch: Dispatch<any>) => {
  dispatch(loginSuccess());
  if (getCurrentUserRole() === Roles.FocusGroupManager || getCurrentUserRole() === Roles.Admin) {
    dispatch(await router.push('/manager'));
  }
  if (getCurrentUserRole() === Roles.User) {
    dispatch(await router.push('/me'));
  }
};
