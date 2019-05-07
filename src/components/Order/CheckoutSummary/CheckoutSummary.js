import React from 'react';
import Burguer from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return(
    <div className={styles.CheckoutSummary}>
      <h1>I hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burguer ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;
