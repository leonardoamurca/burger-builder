import React from 'react';

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    );
  });

  console.log(ingredientsSummary);
  return (
    <>
      <h3>YOUR ORDER</h3>
      <p>A delicious burguer with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
    </>
  );
};

export default OrderSummary;
