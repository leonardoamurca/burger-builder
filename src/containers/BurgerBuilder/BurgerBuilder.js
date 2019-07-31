import React, { useState, useEffect } from 'react';
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

function BurgerBuilder({
  onInitIngredients,
  isAuthenticated,
  onSetAuthRedirectPath,
  history,
  onInitPurchase,
  ings,
  price,
  onIngredientAdded,
  onIngredientRemoved,
  error,
}) {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  function isPurchaseable(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push('/checkout');
  };

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
        <h1 style={{ textAlign: 'center' }}>
          Não foi possível carregar os ingredientes!
        </h1>
      ) : (
        <Spinner />
      )}
    </>
  );
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
