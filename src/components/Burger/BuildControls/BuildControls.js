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
    {controls.map(ctrl => {
      return (
        <BuildControl
          ingredientLabel={ctrl.label}
          type={ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
        />
      );
    })}
  </div>
);

export default BuildControls;
