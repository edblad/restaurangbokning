import React, { Component } from 'react';
import './menu.css';
import { Link } from 'react-router-dom';

class Menu extends Component {
    
  state = {
    isHamburgerMenuHidden: true
  }

  render() {
    return (
        
    <div className="menu">
      <div className="normalMenu">
        <Link to="/">Home</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/" className="noDecor"><div className="circle"><span>SIX</span></div></Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
        
      <div className="hamburgerMenu">
        <Link to="/" className="noDecor"><span className="mobileLogo">SIX</span></Link>
        <nav>
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menuHamburgerSlide">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>  
    );
  }
}

export default Menu;
