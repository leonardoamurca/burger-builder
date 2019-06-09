import {
  PURCHASE_BURGUER_FAIL,
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) =>
  updateObject(state, { purchased: false });

const purchaseBurguerStart = (state, action) =>
  updateObject(state, { loading: true });

const purchaseBurguerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    purchased: true,
    loading: false,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurguerFail = (state, action) =>
  updateObject(state, { loading: false });

const fetchOrdersStart = (state, action) =>
  updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) =>
  updateObject(state, { orders: action.orders, loading: false });

const fetchOrdersFail = (state, action) =>
  updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);

    case PURCHASE_BURGUER_START:
      return purchaseBurguerStart(state, action);

    case PURCHASE_BURGUER_SUCCESS:
      return purchaseBurguerSuccess(state, action);

    case PURCHASE_BURGUER_FAIL:
      return purchaseBurguerFail(state, action);

    case FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
