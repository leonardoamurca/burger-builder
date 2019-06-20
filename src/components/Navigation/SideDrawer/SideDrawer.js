import React from 'react';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';

import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = ({ open, closed, isAuth }) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];

  if (open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedStyles.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
