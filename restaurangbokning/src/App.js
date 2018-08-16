import React, { Component } from 'react';
import './App.css';
import Fetch from './Fetch.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Fetch />
      </div>
    );
  }
}

export default App;
