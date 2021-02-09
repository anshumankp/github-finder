import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <span className='logo-text'>&#169; Anshuman Kashyap, 2021 |</span>
      <ul className='social-links'>
        <li>
          <i class='fab fa-linkedin linkedin'></i>
        </li>

        <li>
          <i class='fab fa-instagram insta'></i>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
