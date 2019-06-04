import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios.get('https://my-burguer-builder.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   });
  }

  isPurchaseable(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing, loading, error } = this.state;
    const { ings, price, onIngredientAdded, onIngredientRemoved } = this.props;
    const disabledInfo = {
      ...ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal show={purchasing} modalClose={this.purchaseHandler}>
          {loading || !ings ? (
            <Spinner />
          ) : (
            <OrderSummary
              purchaseContinued={this.purchaseContinueHandler}
              purchaseCanceled={this.purchaseCancelHandler}
              ingredients={ings}
              totalPrice={price}
            />
          )}
        </Modal>
        {ings ? (
          <>
            <Burger ingredients={ings} />
            <BuildControls
              ingredientAdded={onIngredientAdded}
              ingredientRemoved={onIngredientRemoved}
              currentPrice={price}
              disabled={disabledInfo}
              ordered={this.purchaseHandler}
              purchaseable={this.isPurchaseable(ings)}
            />
          </>
        ) : error ? (
          <h1 style={{ textAlign: 'center' }}>Ingredients cannot be loaded!</h1>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({ type: ADD_INGREDIENT, ingredientName: ingredientName }),
    onIngredientRemoved: ingredientName =>
      dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingredientName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
