import { useState } from 'react';
import './App.css';

var md5 = require('md5');

function App() {
  const [prefix, setPrefix] = useState<string>("");
  const [postcodeToCheck, setPostcodeToCheck] = useState<string>("");
  const [state, setState] = useState<string>("getVariant");

  const toggleState = () => {
    setState(state === "getVariant" ? "checkVariant" : "getVariant");
  }

  const isVariant = (postcode: string): boolean => {
    const normalisedPostcode = postcode.toUpperCase().replaceAll(" ", "");
    console.log(`Normalised postcode: ${normalisedPostcode}`);
    return parseInt(md5(normalisedPostcode), 16) % 1000 > 500;
  }

  const getValidSuffix = (): string => {
    for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      var suffix = "1A" + char;
      var fullPostcode = prefix + suffix;
      if (isVariant(fullPostcode)) {
        return suffix;
      }
    }
    return "";
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
          </>
        );

      case "checkVariant":
        return (
          <>
            <p className="margin-bottom-large">
              Input a postcode to see which bucket it will be in.
            </p>
            <input
              className="prefix-input margin-bottom-large"
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

export default App;
