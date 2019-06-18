import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './types';
import axios from 'axios';

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
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD2Ct9oP9MpVDSzhqTYs8LzdKiQFSsSnSY';
  if (!isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD2Ct9oP9MpVDSzhqTYs8LzdKiQFSsSnSY';
  }
  axios
    .post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};
