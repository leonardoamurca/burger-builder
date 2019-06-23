import React from 'react';

import styles from './CheckoutSummary.module.css';

import Button from '../../UI/Button/Button';
import Burguer from '../../Burger/Burger';

const CheckoutSummary = ({
  ingredients,
  checkoutContinued,
  checkoutCancelled,
}) => {
  console.log(ingredients);
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Ser feliz (e bem alimentado) é o que importa!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burguer ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCELAR
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUAR
      </Button>
    </div>
  );
};

export default CheckoutSummary;
