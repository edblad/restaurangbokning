import React, { Component } from 'react';
import './App.css';
import Fetch from './Fetch.js';
import Form from './components/Form';
import { Switch, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>home</div>
);

const Booking = () => (
  <div>booking</div>
);

const Contact = () => (
  <div>contact</div>
);

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

        <header className="App-header">
        </header>
        <p className="App-intro">
Resturang        </p>
        <Form />
        <Fetch />

      </div>
    );
  }
}

export default App;
