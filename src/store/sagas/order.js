import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import {
  purchaseBurguerStart,
  purchaseBurguerSuccess,
  purchaseBurguerFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
} from '../actions/order';

export function* purchaseBurguerSaga(action) {
  yield put(purchaseBurguerStart());

  const response = yield axios.post(
    '/orders.json?auth=' + action.token,
    action.orderData
  );
  try {
    yield put(purchaseBurguerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurguerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams =
    '?auth=' +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';

  try {
    const response = yield axios.get('/orders.json' + queryParams);

    const fetchedOrders = [];
    for (let key in response.data) {
      yield fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrdersFail(error));
  }
}
