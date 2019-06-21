import { updateObject } from '../../shared/utility';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from '../actions/types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) =>
  updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });

const authFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
  });

const authLogout = (state, action) =>
  updateObject(state, {
    token: null,
    userId: null,
  });

const setAuthRedirectPath = (state, action) =>
  updateObject(state, { authRedirectPath: action.path });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
