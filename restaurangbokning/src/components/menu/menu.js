import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <Link to="/">Home</Link>
    <Link to="/booking">Booking</Link>
    <Link to="/contact">Contact</Link>
  </div>
);

export default Menu;
