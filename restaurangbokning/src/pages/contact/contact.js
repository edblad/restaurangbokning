import React from 'react';
import './contact.css';

const Contact = () => (
  <div className="page-contact">
    <div className="contactHeader"></div>

    <div className="contactDetails">
      <div className="contactBox">
        <h2>Opening hours</h2>
        <ul>
          <li>Monday-Friday: 18.00-24.00</li>
          <li>Saturday: 17.00-01.00</li>
          <li>Sunday: 17.00-23.00</li>
        </ul>
      </div>
      <div className="contactBox">
        <h2>Contact</h2>
        <ul>
          <li>Brunch street 1337</li>
          <li>Pancake land 4029</li>
          <li>010 123 123</li>
        </ul>
      </div>
      <div className="contactBox">
        <h2>Social</h2>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Contact;
