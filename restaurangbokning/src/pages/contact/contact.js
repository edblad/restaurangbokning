import React from 'react';
import './contact.css';

const Contact = () => (
  <div className="page-contact">
    <div className="contactHeader"></div>

    <div className="contactDetails">
      <div className="contactBox">
        <h2>Opening hours</h2>
        <ul>
          <li>Monday-Friday: 08.00-17.00</li>
          <li>Saturday: 09.00-16.00</li>
          <li>Sunday: 11.00-16.00</li>
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
