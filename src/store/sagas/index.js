import { takeEvery } from 'redux-saga/effects';
import {
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
  INITIALIZE_INGREDIENTS,
} from '../actions/types';

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckState,
} from './auth';

import { initIngredientsSaga } from './burguerBuilder';

export function* watchAuth() {
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(AUTH_USER, authUserSaga);
  yield takeEvery(AUTH_CHECK_STATE, authCheckState);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INITIALIZE_INGREDIENTS, initIngredientsSaga);
}
