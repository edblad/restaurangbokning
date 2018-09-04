import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import iconHome from '../.././images/iconHome.svg';

const Menu = () => (
  <div className="menu">
    <Link to="/">Home</Link>
    <Link to="/booking">Booking</Link>
    {/* <img src={iconHome} alt="Icon for home" className="iconHome"/> */}
    <Link to="/contact">Contact</Link>
    <Link to="/admin">Admin</Link>
  </div>
);

export default Menu;
