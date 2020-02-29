import React, { Component } from 'react';

import './App.css';
import { ReactComponent as ReactSVG } from './react.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <ReactSVG width={200} height={200} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
