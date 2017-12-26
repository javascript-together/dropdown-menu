import React, { Component } from 'react';
import Dropdown from './Dropdown';
import logo from './logo.svg';
import Data from './data.json';
import './App.css';

const GROUP_TYPE = 'group';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }

  _parseData() {
    let data = Data.organizations.map((org) => {
      let orgApps = []
      let appData = org.appIds.map(app => {
        let apps = Data.apps.find((app_detail) => {
          return app_detail.id === app
        })
        orgApps.push(apps)
      })

      let items = orgApps.map(app => {
        return {
          value: app.id,
          label: app.name,
          icon: app.iconUrl
        }
      })

      return { type: 'group', name: org.name, items: items }
    })

    this.setState({ options: data })
  }

  componentDidMount() {
    this._parseData()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Dropdown options={this.state.options} onChange={this._onSelect} placeholder="Select an option" />
      </div>
    );
  }
}

export default App;
