import React from 'react';
import './App.css';

var md5 = require('md5');

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Input a prefix, and get a variant postcode.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {md5("Hiii")}
        </a>
      </header>
    </div>
  );
}

export default App;
