import React, { Component } from 'react';
import './App.css';
import Fetch from './Fetch.js';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
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
