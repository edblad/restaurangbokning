import React from 'react';
import './home.css';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page-home">
    <div className="homeBox">
      <h1>Six</h1>
      <p>Six is a central restaurant serving a menu inspired by the vibrant city of Stockholm. Award-winning
 Chef Michael Cimarusti helms the menu and Chef Crisi Echiverri oversees desserts.</p>
      <Link to="/Contact">
        <Button className="button ghost homeButton" text="Find us" />
      </Link>
      <Link to="/Booking">
        <Button className="button secondary homeButton" text="Make a reservation"/>
      </Link>
            </div>
</div>
);

export default Home;
