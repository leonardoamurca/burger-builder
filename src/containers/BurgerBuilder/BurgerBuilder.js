import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.2,
  meat: 1.9,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://my-burguer-builder.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceRemove = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemove;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Leonardo',
        address: {
          street: 'Rua dos Bobos',
          zipCode: '31294092',
          country: 'Brazil'
        },
        email: 'leo@gmail.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
        console.log(response);
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
        console.log(error);
      })
  };

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;
    const {
      addIngredientHandler,
      removeIngredientHandler,
      purchaseHandler,
      purchaseCancelHandler,
      purchaseContinueHandler,
    } = this;
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal show={purchasing} modalClose={purchaseHandler}>
        {this.state.loading || !this.state.ingredients
          ? <Spinner/>
          : <OrderSummary
              purchaseContinued={purchaseContinueHandler}
              purchaseCanceled={purchaseCancelHandler}
              ingredients={ingredients}
              totalPrice={totalPrice}
            />
        }

        </Modal>
        {this.state.ingredients
          ?
          <>
            <Burger ingredients={ingredients} />
            <BuildControls
              ingredientAdded={addIngredientHandler}
              ingredientRemoved={removeIngredientHandler}
              currentPrice={totalPrice}
              disabled={disabledInfo}
              ordered={purchaseHandler}
              purchaseable={purchaseable}
            />
          </>
          : this.state.error
              ?
                <h1 style={{textAlign: 'center'}}>
                  Ingredients cannot be loaded!
                </h1>
              : <Spinner/>
        }

      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
