import React, { PureComponent } from 'react';

import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }
  render() {
    const { show, children, modalClose } = this.props;
    return (
      <>
        <div
          className={styles.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0  ',
          }}
        >
          {children}
        </div>
        <Backdrop show={show} clicked={modalClose} />
      </>
    );
  }
}

export default Modal;
