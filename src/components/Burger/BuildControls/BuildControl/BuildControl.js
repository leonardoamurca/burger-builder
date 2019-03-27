import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.IngredientLabel}>{props.ingredientLabel}</div>
    <button
      onClick={props.removed}
      disabled={props.disabled}
      className={styles.Less}
    >
      Less
    </button>
    <button onClick={props.added} className={styles.More}>
      More
    </button>
  </div>
);

export default BuildControl;
