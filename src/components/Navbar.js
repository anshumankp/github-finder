import React from 'react';
import { Container } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Container>
        <h3 className='navbar-logo text-left'>
          <span style={{ color: '#03dac6' }}>
            <i className='fab fa-github'></i>G
          </span>
          it Hunt
        </h3>
      </Container>
    </div>
  );
};

export default Navbar;
