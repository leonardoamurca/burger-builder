import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

function Layout({ isAuthenticated, children }) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);
  };

  return (
    <>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{children}</main>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(
  mapStateToProps,
  null
)(Layout);
