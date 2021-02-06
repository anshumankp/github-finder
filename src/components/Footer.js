import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <div className='footer'>
      <ul className='social-links'>
        <li>
          <span>
            <i class='fab fa-github'></i>
          </span>
        </li>
        <li>
          <span>
            <i class='fab fa-linkedin'></i>
          </span>
        </li>
        <li>
          <span>
            <i class='fab fa-instagram'></i>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
