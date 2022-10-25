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
        return isBucketCVariant(hashedValue);
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
                >
                    Toggle mode
                </button>
            </header>
        </div>
    );
}

const isBucketAVariant = (hashedValue: number): boolean => {
    const isControl = hashedValue < 500;
    return !isControl;
}

const isBucketCVariant = (hashedValue: number): boolean => {
    const isControl = (
        (hashedValue < 125) ||
        (hashedValue > 249) && (hashedValue < 375) ||
        (hashedValue > 499) && (hashedValue < 625) ||
        (hashedValue > 749) && (hashedValue < 875)
    )
    return !isControl;
}

export default App;
