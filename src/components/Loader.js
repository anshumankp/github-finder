import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner animation='border' role='status' className='m-2 centered'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
