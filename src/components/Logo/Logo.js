import React from 'react';

import styles from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="" />
  </div>
);

export default Logo;
