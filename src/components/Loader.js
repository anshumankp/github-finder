import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className='text-center'>
      <Spinner
        animation='border'
        style={{ color: '#03dac6' }}
        role='status'
        className='my-4 mx-auto'
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
