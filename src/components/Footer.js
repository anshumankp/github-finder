import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <span className='logo-text'>&#169; Anshuman Kashyap, 2021 |</span>
      <ul className='social-links'>
        <li>
          <a
            href='https://www.linkedin.com/in/anshuman-kashyap-212746199/'
            target='_blank'
            rel='noreferrer'
          >
            <i class='fab fa-linkedin linkedin'></i>
          </a>
        </li>

        <li>
          <a
            href='https://www.instagram.com/_anshuman_kp/'
            target='_blank'
            rel='referrer'
          >
            <i class='fab fa-instagram insta'></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
