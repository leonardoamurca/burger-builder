import React from 'react';

import styles from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salada', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Queijo', type: 'cheese' },
  { label: 'Carne', type: 'meat' },
];

const BuildControls = ({
  currentPrice,
  ingredientAdded,
  ingredientRemoved,
  disabled,
  purchaseable,
  ordered,
  isAuth,
}) => (
  <div className={styles.BuildControls}>
    <p>
      Preço atual: <strong>R${currentPrice.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => {
      return (
        <BuildControl
          key={ctrl.label + 666}
          ingredientLabel={ctrl.label}
          type={ctrl.type}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      );
    })}
    <button
      className={styles.OrderButton}
      disabled={!purchaseable}
      onClick={ordered}
    >
      {isAuth ? 'PEDIR AGORA' : 'CADASTRE-SE PARA PEDIR'}
    </button>
  </div>
);

export default BuildControls;
