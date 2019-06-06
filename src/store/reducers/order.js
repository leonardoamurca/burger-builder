import {
  PURCHASE_BURGUER_FAIL,
  PURCHASE_BURGUER_SUCCESS,
  PURCHASE_BURGUER_START,
  PURCHASE_INIT,
} from '../actions/types';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case PURCHASE_BURGUER_START:
      return {
        ...state,
        loading: true,
      };

    case PURCHASE_BURGUER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        purchased: true,
        loading: false,
        orders: state.orders.concat(newOrder),
      };
    case PURCHASE_BURGUER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
