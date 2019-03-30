import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      Current Price: <strong>${props.currentPrice.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => {
      return (
        <BuildControl
          ingredientLabel={ctrl.label}
          type={ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      );
    })}
    <button className={styles.OrderButton} disabled={!props.purchaseable}>
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
