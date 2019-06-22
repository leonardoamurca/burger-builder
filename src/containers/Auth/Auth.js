import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity } from '../../shared/utility';

import { auth, setAuthRedirectPath } from '../../store/actions/auth';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Senha',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup,
    }));
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  render() {
    const { error, isAuthenticated, authRedirectPath, loading } = this.props;
    const { controls, isSignup } = this.state;
    const { inputChangeHandler, submitHandler, switchAuthModeHandler } = this;

    let formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => inputChangeHandler(event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;

    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return loading ? (
      <Spinner />
    ) : (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">{isSignup ? 'CADASTRAR' : 'ENTRAR'}</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          MUDAR PARA {isSignup ? 'LOGIN' : 'CADASTRO'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burguerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
