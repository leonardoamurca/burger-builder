import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = ({ ingredientLabel, removed, disabled, added }) => (
  <div className={styles.BuildControl}>
    <div className={styles.IngredientLabel}>{ingredientLabel}</div>
    <button onClick={removed} disabled={disabled} className={styles.Less}>
      Less
    </button>
    <button onClick={added} className={styles.More}>
      More
    </button>
  </div>
);

export default BuildControl;
