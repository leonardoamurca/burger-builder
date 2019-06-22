import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import styles from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

import { purchaseBurguer } from '../../../store/actions/order';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Nome completo',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Rua',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'CEP',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'País',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Seu e-mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Rápido' },
            { value: 'cheapest', displayValue: 'Barato' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurguer(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const { loading } = this.props;
    const { orderForm, formIsValid } = this.state;
    const { orderHandler, inputChangeHandler } = this;

    let formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    return (
      <div className={styles.ContactData}>
        <h4>Preencha suas informações para contato</h4>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={orderHandler}>
            {formElementsArray.map(el => (
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={event => inputChangeHandler(event, el.id)}
              />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>
              PEDIR
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burguerBuilder.ingredients,
  price: state.burguerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurguer: (orderData, token) =>
    dispatch(purchaseBurguer(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
