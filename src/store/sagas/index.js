import { takeEvery } from 'redux-saga/effects';
import {
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
  INITIALIZE_INGREDIENTS,
  PURCHASE_BURGUER,
  FETCH_ORDERS,
} from '../actions/types';

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckState,
} from './auth';

import { initIngredientsSaga } from './burguerBuilder';

import { purchaseBurguerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(AUTH_USER, authUserSaga);
  yield takeEvery(AUTH_CHECK_STATE, authCheckState);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INITIALIZE_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(PURCHASE_BURGUER, purchaseBurguerSaga);
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}
