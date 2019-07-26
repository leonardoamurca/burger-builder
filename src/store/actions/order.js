import {
  PURCHASE_BURGUER_START,
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_FAIL,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  PURCHASE_BURGUER,
  FETCH_ORDERS,
} from './types';

export const purchaseBurguerStart = () => ({
  type: PURCHASE_BURGUER_START,
});

export const purchaseBurguerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGUER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurguerFail = error => ({
  type: PURCHASE_BURGUER_FAIL,
  error,
});

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
});

export const purchaseBurguer = (orderData, token) => {
  return {
    type: PURCHASE_BURGUER,
    orderData,
    token,
  };
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

export const fetchOrders = (token, userId) => {
  return {
    type: FETCH_ORDERS,
    token,
    userId,
  };
};
