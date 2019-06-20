import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

import withErrorHandler from '../withErrorHandler/withErrorHandler';

import { fetchOrders } from '../../store/actions/order';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    const { loading, orders } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(fetchOrders(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
