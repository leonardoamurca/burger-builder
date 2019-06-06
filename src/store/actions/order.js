import {
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_FAIL,
  PURCHASE_BURGUER_START,
} from './types';
import axios from '../../axios-orders';

export const purchaseBurguerStart = () => {
  return {
    type: PURCHASE_BURGUER_START,
  };
};

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurguerFail = error => {
  return {
    type: PURCHASE_BURGUER_FAIL,
    error,
  };
};

export const purchaseBurguer = orderData => dispatch => {
  purchaseBurguerStart();
  axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurguerSuccess(response.data, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurguerFail(error));
    });
};
