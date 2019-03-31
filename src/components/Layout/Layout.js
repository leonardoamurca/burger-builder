import React from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
  <>
    <Toolbar />
    <main className={styles.Content}>{props.children}</main>
  </>
);

export default Layout;
