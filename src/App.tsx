import { useState } from 'react';
import './App.css';

var md5 = require('md5');
var converter = require('hex2dec');

function App() {
  const [state, setState] = useState<string>("getVariant");

  const [prefix, setPrefix] = useState<string>("");
  const [postcodeToCheck, setPostcodeToCheck] = useState<string>("");

  const toggleState = () => {
    setState(state === "getVariant" ? "checkVariant" : "getVariant");
  }

  const isVariant = (postcode: string): boolean => {
    const normalisedPostcode = postcode.toLowerCase().replaceAll(" ", "");
    const hashedValue = parseInt(converter.hexToDec(md5(normalisedPostcode)).slice(-3));
    console.log(`Normalised postcode: ${normalisedPostcode} (hashed value: ${hashedValue})`);
    return hashedValue >= 500;
  }

  const getRandomSuffix = (): string => {
    return (
      getRandomElement('0123456789') +
      getRandomElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ') +
      getRandomElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    );
  }

  const getValidSuffix = (): string => {
    const suffix = getRandomSuffix();
    if (isVariant(prefix + suffix)) {
      return suffix;
    } else {
      return getValidSuffix();
    }
  }

  const getBucket = (postcode: string): string => {
    if (postcode === "") {
      return "_";
    }
    return isVariant(postcode) ? "variant_a" : "control";
  }

  const getContent = () => {
    switch (state) {
      case "getVariant":
        return (
          <>
            <p className="page-title margin-bottom-large">
              Input a prefix, and get a variant postcode.
            </p>
            <input
              className="input-box margin-bottom-large"
              value={prefix}
              onChange={(e: any) => setPrefix(e.target.value)}
            />
            <div>
              <p className="italic">Sample variant postcode:</p>
              <p className="sample-postcode">{prefix.toUpperCase()} {getValidSuffix()}</p>
            </div>
          </>
        );

      case "checkVariant":
        return (
          <>
            <p className="page-title margin-bottom-large">
              Input a postcode to see which bucket it will be in.
            </p>
            <input
              className="input-box margin-bottom-large"
              value={postcodeToCheck}
              onChange={(e: any) => setPostcodeToCheck(e.target.value)}
            />
            <div>
              <p className="italic">A/B Testing Bucket:</p>
              <p className="sample-postcode">{getBucket(postcodeToCheck)}</p>
            </div>
          </>
        );

      default:
        return (
          <p>Invalid state: {state}</p>
        );
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

function getRandomElement(inputList: any[] | string): any {
  const l = inputList.length;
  const i = Math.floor(l * Math.random());
  return inputList[i];
}


export default App;
