import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Booking from './pages/booking/booking';
import Contact from './pages/contact/contact';
import Menu from './components/menu/menu';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Menu />
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
