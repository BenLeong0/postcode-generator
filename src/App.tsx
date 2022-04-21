import React, { useState } from 'react';
import './App.css';

var md5 = require('md5');

function App() {
  const [prefix, setPrefix] = useState<string>("");
  const [state, setState] = useState<string>("getVariant");

  const isVariant = (postcode: string): boolean => {
    return parseInt(md5(postcode), 16) % 1000 > 500;
  }

  const getValidSuffix = (): string => {
    for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      var suffix = "1A" + char;
      var fullPostcode = prefix + suffix;
      if (isVariant(fullPostcode.replace(" ", "").toUpperCase())) {
        return suffix;
      }
    }
    return "";
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="margin-bottom-large">
          Input a prefix, and get a variant postcode.
        </p>
        <input
          className="prefix-input margin-bottom-large"
          value={prefix}
          onChange={(e: any) => setPrefix(e.target.value)}
        />
        <div>
          <p className="italic">Sample variant postcode:</p>
          <p className="sample-postcode">{prefix.toUpperCase()} {getValidSuffix()}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
