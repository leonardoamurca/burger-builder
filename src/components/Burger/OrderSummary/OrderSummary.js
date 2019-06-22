import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  totalPrice,
  purchaseContinued,
  purchaseCanceled,
}) => {
  const ingredientsSummary = Object.keys(ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
      {[igKey]}
    </li>
  ));

  return (
    <>
      <h3>SEU PEDIDO</h3>
      <p>Um hamburgão delicioso com os seguintes ingredientes: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Valor total: ${totalPrice.toFixed(2)}</strong>
      </p>
      <p>Prosseguir para o pagamento?</p>
      <Button btnType="Danger" clicked={purchaseCanceled}>
        CANCELAR
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUAR
      </Button>
    </>
  );
};

export default OrderSummary;
