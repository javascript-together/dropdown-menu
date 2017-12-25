import React, { Component } from 'react';
import Dropdown from './Dropdown';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  _onSelect() {
  }

  render() {
    const options = [
      'one', 'two', 'three'
    ];

    const defaultOption = 'one';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
      </div>
    );
  }
}

export default App;
