import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'normalize.css';
import './styles/global.css'
import StrategyTreeEX from './examples/StrategyTreeEX';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react 自定义组件测试</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {/*策略树*/}
        <StrategyTreeEX />

      </div>
    );
  }
}

export default App;
