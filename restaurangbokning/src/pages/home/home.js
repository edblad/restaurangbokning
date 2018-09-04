import React from 'react';
import './home.css';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="page-home">
    <div className="homeBox">
      <h1>Lorem ipsum</h1>
      <p>Lorem ipsum dolor sit amet, cum fierent assentior te. Nec meliore gubergren ex. Eum movet vidisse placerat ad, in vix sumo ponderum perfecto</p>
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
