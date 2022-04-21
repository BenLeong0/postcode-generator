import { useState } from 'react';
import './App.css';

import CheckVariant from './components/CheckVariant';
import GetVariant from './components/GetVariant';

var md5 = require('md5');
var converter = require('hex2dec');

function App() {
  const [state, setState] = useState<string>("getVariant");

  const toggleState = () => {
    setState(state === "getVariant" ? "checkVariant" : "getVariant");
  }

  const isVariant = (postcode: string): boolean => {
    const normalisedPostcode = postcode.toLowerCase().replaceAll(" ", "");
    const hashedValue = parseInt(converter.hexToDec(md5(normalisedPostcode)).slice(-3));
    console.log(`Normalised postcode: ${normalisedPostcode} (hashed value: ${hashedValue})`);
    return hashedValue >= 500;
  }

  const getContent = () => {
    switch (state) {
      case "getVariant":
        return <GetVariant isVariant={isVariant}/>;

      case "checkVariant":
        return <CheckVariant isVariant={isVariant} />;

      default:
        return <p>Invalid state: {state}</p>;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {getContent()}
        <button
          className="toggle-button margin-top-large"
          onClick={toggleState}
        >Toggle mode</button>
      </header>
    </div>
  );
}

export default App;
