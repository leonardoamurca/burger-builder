import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const NavigationItem = ({ link, exact, children }) => (
  <li className={styles.NavigationItem}>
    <NavLink to={link} exact={exact} activeClassName={styles.active}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
