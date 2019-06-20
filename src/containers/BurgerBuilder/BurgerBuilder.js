import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../withErrorHandler/withErrorHandler';

import {
  addIngredient,
  removeIngredient,
  initIngredients,
} from '../../store/actions/burguerBuilder';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { purchaseInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isPurchaseable(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const {
      ings,
      price,
      onIngredientAdded,
      onIngredientRemoved,
      isAuthenticated,
      error,
    } = this.props;
    const { purchasing } = this.state;
    const {
      purchaseHandler,
      purchaseContinueHandler,
      purchaseCancelHandler,
      isPurchaseable,
    } = this;
    const disabledInfo = { ...ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal show={purchasing} modalClose={purchaseHandler}>
          {!ings ? (
            <Spinner />
          ) : (
            <OrderSummary
              purchaseContinued={purchaseContinueHandler}
              purchaseCanceled={purchaseCancelHandler}
              ingredients={ings}
              totalPrice={price}
            />
          )}
        </Modal>
        {ings ? (
          <>
            <Burger ingredients={ings} />
            <BuildControls
              ingredientAdded={onIngredientAdded}
              ingredientRemoved={onIngredientRemoved}
              currentPrice={price}
              disabled={disabledInfo}
              ordered={purchaseHandler}
              purchaseable={isPurchaseable(ings)}
              isAuth={isAuthenticated}
            />
          </>
        ) : error ? (
          <h1 style={{ textAlign: 'center' }}>Ingredients cannot be loaded!</h1>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burguerBuilder.ingredients,
  price: state.burguerBuilder.totalPrice,
  error: state.order.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName => dispatch(addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName =>
    dispatch(removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
