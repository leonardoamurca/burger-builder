import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity } from '../../shared/utility';

import { auth, setAuthRedirectPath } from '../../store/actions/auth';

function Auth({
  buildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath,
  onAuth,
  error,
  isAuthenticated,
  loading,
}) {
  const [controls, setControls] = useState({
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
  });

  const [isSignup, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchAuthModeHandler = () => {
    setIsSignUp(prevIsSignUp => !prevIsSignUp);
  };

  const submitHandler = event => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

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
