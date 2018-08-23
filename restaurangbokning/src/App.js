import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/home/home';
import Booking from './pages/booking/booking';
import Contact from './pages/contact/contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/contact">Contact</Link>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/booking' component={Booking}/>
          <Route path='/contact' component={Contact}/>
        </Switch>
      </div>
    );
  }
}
export default App;
