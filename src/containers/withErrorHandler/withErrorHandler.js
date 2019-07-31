import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

function withErrorHandler(WrappedComponent, axios) {
  return function(props) {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <>
        <Modal show={error} modalClose={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
}

export default withErrorHandler;
