import React, { Component } from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import iconHome from '../.././images/iconHome.svg';


class Menu extends Component {
    
        state = {
            isHamburgerMenuHidden: true
        }


    toogleHamburgerMenu = (event) => {
        event.preventDefault();

        this.setState({
            isHamburgerMenuHidden: false
        });
        
            }

  render() {
      
    const addHamburgerStyle = this.state.isHamburgerMenuHidden ? { display: 'none'} : {};

    return (
        
  <div className="menu">
    <div className="normalMenu">
    <Link to="/">Home</Link>
    <Link to="/booking">Booking</Link>
    {/* <img src={iconHome} alt="Icon for home" className="iconHome"/> */}
    <div className="circle"><span>SIX</span></div>
    <Link to="/contact">Contact</Link>
    <Link to="/admin">Admin</Link>
    </div>
    
    <div className="hamburgerMenu" onClick={this.toogleHamburgerMenu}>
    <nav class="menu-opener" >
        <div class="menu-opener-inner"></div>
    </nav>
    <nav class="menuB" style={addHamburgerStyle}>
    <ul class="menu-inner">
    <Link to="/">Home</Link>
    <Link to="/booking">Booking</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/admin">Admin</Link>
    </ul>
  </nav>
    </div></div>
        
    );
  }
}

export default Menu;
