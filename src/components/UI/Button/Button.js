import React from 'react';

import styles from './Button.module.css';

const Button = ({ btnType, clicked, disabled, children }) => (
  <button
    className={[styles.Button, styles[btnType]].join(' ')}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
