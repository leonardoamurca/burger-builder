import React from 'react';

import styles from './DrawerToggle.module.css';

const DrawerToggle = ({ clicked }) => (
  <div onClick={clicked} className={styles.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);
export default DrawerToggle;
