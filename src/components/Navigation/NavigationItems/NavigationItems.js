import React from 'react';

import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuthenticated }) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/">Construa seu hamburger</NavigationItem>
    {isAuthenticated ? (
      <NavigationItem link="/orders">Seus pedidos</NavigationItem>
    ) : null}

    {!isAuthenticated ? (
      <NavigationItem link="/auth">Cadastre-se</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Sair</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
