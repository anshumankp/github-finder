import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner animation='border' role='status' className='my-2 mx-auto'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
