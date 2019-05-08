import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients);
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Leozin',
        address: {
          street: 'Silly Street',
          zipCode: '31294092',
          country: 'Brazil'
        },
        email: 'leo@gmail.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false });
        this.props.history.push('/');
        console.log(response);
      })
      .catch(error => {
        this.setState({loading: false });
        console.log(error);
      });
  }
  render() {
    return(
      <div className={styles.ContactData}>
        <h4>Entre your Contact Data</h4>
        {this.state.loading
          ? <Spinner/>
          : <form>
              <input type="text" className={styles.Input} name="name" placeholder="Your name" />
              <input type="email" className={styles.Input} name="email" placeholder="Your e-mail" />
              <input type="text" className={styles.Input} name="street" placeholder="Street" />
              <input type="text" className={styles.Input} name="postal" placeholder="Postal Code" />
              <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        }

      </div>
    )
  }
}

export default ContactData;
