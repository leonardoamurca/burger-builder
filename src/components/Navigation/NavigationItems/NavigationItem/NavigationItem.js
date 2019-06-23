import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const NavigationItem = ({ link, children }) => (
  <li className={styles.NavigationItem}>
    <NavLink to={link} exact activeClassName={styles.active}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
