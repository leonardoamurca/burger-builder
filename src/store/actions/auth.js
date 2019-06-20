import axios from 'axios';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from './types';

import { loginUrl, signUpUrl } from '../../configs/endpoints';

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

export const logout = () => ({
  type: AUTH_LOGOUT,
});

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const setAuthRedirectPath = path => ({
  type: SET_AUTH_REDIRECT_PATH,
  path,
});

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = signUpUrl;

  if (!isSignup) {
    url = loginUrl;
  }

  axios
    .post(url, authData)
    .then(response => {
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};
