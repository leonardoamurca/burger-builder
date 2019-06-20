import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = ({ show, clicked }) =>
  show ? <div className={styles.Backdrop} onClick={clicked} /> : null;

export default Backdrop;
