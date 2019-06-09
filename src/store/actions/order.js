import {
  PURCHASE_BURGUER_START,
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_FAIL,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from './types';
import axios from '../../axios-orders';

export const purchaseBurguerStart = () => ({
  type: PURCHASE_BURGUER_START,
});

export const purchaseBurguerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGUER_SUCCESS,
  orderId: id,
  orderData: orderData,
});

export const purchaseBurguerFail = error => ({
  type: PURCHASE_BURGUER_FAIL,
  error,
});

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
});

export const purchaseBurguer = orderData => dispatch => {
  purchaseBurguerStart();
  axios
    .post('/orders.json', orderData)
    .then(response => {
      dispatch(purchaseBurguerSuccess(response.data.name, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurguerFail(error));
    });
};

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
};
