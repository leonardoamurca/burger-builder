import React from 'react';

import styles from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const finalIngredients = [];

  for (let ingredientName in ingredients) {
    finalIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }
  return (
    <div className={styles.Order}>
      <p>
        Ingredients:
        {finalIngredients.map(ingredient => (
          <span
            key={ingredient.name}
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px',
            }}
          >
            {ingredient.name}({ingredient.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>${Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
