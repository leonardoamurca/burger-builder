import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.IngredientLabel}>{props.ingredientLabel}</div>
    <button className={styles.Less}>Less</button>
    <button className={styles.More}>More</button>
  </div>
);

export default BuildControl;
