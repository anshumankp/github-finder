import React from 'react';
import './Error.css';

const Error = ({ message }) => {
  return (
    <div className='error-box'>
      <h3 className='text-danger text-center'>{message}</h3>

      <img src='octocat_sad.png' alt='sorry' />
    </div>
  );
};

export default Error;
