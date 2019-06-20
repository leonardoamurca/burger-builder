import React from 'react';

import styles from './CheckoutSummary.module.css';

import Button from '../../UI/Button/Button';
import Burguer from '../../Burger/Burger';

const CheckoutSummary = ({
  ingredients,
  checkoutContinued,
  checkoutCancelled,
}) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>I hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burguer ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
