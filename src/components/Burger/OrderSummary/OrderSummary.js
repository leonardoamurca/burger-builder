import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>YOUR ORDER</h3>
      <p>A delicious burguer with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
