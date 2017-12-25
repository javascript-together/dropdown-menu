import React, { Component } from 'react';
import Dropdown from './Dropdown';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  _onSelect() {
  }

  render() {
    const options = [
      { value: 'one', label: 'One', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' },
      { value: 'two', label: 'Two', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' },
      {
       type: 'group', name: 'group1', items: [
         { value: 'three', label: 'Three', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' },
         { value: 'four', label: 'Four', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' }
       ]
      },
      {
       type: 'group', name: 'group2', items: [
         { value: 'five', label: 'Five', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' },
         { value: 'six', label: 'Six', icon:'https://inapptics-console-avatars-e45pv.s3.amazonaws.com/9ae36100-1635-11e7-8b18-d11b7fbb6c81.jpg' }
       ]
      }
    ]

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Dropdown options={options} onChange={this._onSelect} placeholder="Select an option" />
      </div>
    );
  }
}

export default App;
