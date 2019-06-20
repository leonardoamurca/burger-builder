import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems isAuthenticated={isAuth} />
    </nav>
  </header>
);

export default Toolbar;
