import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };
  render() {
    const { ingredients } = this.state;
    return (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls />
      </>
    );
  }
}

export default BurgerBuilder;
