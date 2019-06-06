import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
} from '../../store/actions/burguerBuilder';

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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing } = this.state;
    const { ings, price, onIngredientAdded, onIngredientRemoved } = this.props;
    const disabledInfo = {
      ...ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal show={purchasing} modalClose={this.purchaseHandler}>
          {!ings ? (
            <Spinner />
          ) : (
            <OrderSummary
              purchaseContinued={this.purchaseContinueHandler}
              purchaseCanceled={this.purchaseCancelHandler}
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
              ordered={this.purchaseHandler}
              purchaseable={this.isPurchaseable(ings)}
            />
          </>
        ) : this.props.error ? (
          <h1 style={{ textAlign: 'center' }}>Ingredients cannot be loaded!</h1>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.order.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
