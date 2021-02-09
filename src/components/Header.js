import React from 'react';
import Typewriter from 'typewriter-effect';

import './Header.css';

const Header = () => {
  return (
    <div className='typewriter'>
      <span>
        <i className='fab fa-github-alt fa-2x'></i>
      </span>
      <Typewriter
        options={{
          strings: ['Users', 'Repos'],
          autoStart: true,
          loop: true
        }}
      ></Typewriter>
    </div>
  );
};

export default Header;
