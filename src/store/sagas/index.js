import { takeEvery, all, takeLatest } from 'redux-saga/effects';
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
  yield all([
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_STATE, authCheckState),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INITIALIZE_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield all([
    takeLatest(PURCHASE_BURGUER, purchaseBurguerSaga),
    takeEvery(FETCH_ORDERS, fetchOrdersSaga),
  ]);
}
