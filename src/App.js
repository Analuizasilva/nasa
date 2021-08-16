import React from 'react';
import './App.css';
import logo from './NASA_logo.svg';
import Card from './components/Card/index';

function App() {
  return (
    <div className="App">
      <div className="App-head">
        <img src={logo} className="logo"></img>
      </div>
      <div className="App-body">
        <Card />
      </div>
    </div>
  );
}

export default App;
