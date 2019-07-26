import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
} from './types';

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error,
});

export const logout = () => {
  return { type: AUTH_INITIATE_LOGOUT };
};

export const logoutSucceed = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expirationTime,
  };
};

export const checkAuthState = () => {
  return {
    type: AUTH_CHECK_STATE,
  };
};

export const setAuthRedirectPath = path => ({
  type: SET_AUTH_REDIRECT_PATH,
  path,
});

export const auth = (email, password, isSignup) => {
  return {
    type: AUTH_USER,
    email,
    password,
    isSignup,
  };
};
