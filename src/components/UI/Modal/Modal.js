import React from 'react';

import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  const { show, children, modalClose } = props;
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
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
