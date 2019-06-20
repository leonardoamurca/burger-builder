import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  render() {
    const { isAuthenticated, children } = this.props;
    const { showSideDrawer } = this.state;
    const { sideDrawerToggleHandler, sideDrawerClosedHandler } = this;

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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(
  mapStateToProps,
  null
)(Layout);
