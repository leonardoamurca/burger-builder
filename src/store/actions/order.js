import {
  PURCHASE_BURGUER_START,
  PURCHASE_INIT,
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_FAIL,
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

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};

export const purchaseBurguer = orderData => dispatch => {
  purchaseBurguerStart();
  axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurguerSuccess(response.data.name, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurguerFail(error));
    });
};
