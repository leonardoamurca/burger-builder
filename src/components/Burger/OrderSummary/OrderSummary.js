import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  totalPrice,
  purchaseContinued,
  purchaseCanceled,
}) => {
  const ingredientsSummary = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
        {ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>YOUR ORDER</h3>
      <p>A delicious burguer with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: ${totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
