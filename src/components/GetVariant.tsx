import React, { useState } from "react";

interface GetVariantProps {
  isVariant: (postcode: string) => boolean;
}

const GetVariant: React.FC<GetVariantProps> = ({ isVariant }) => {
    const [prefix, setPrefix] = useState<string>("");

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

    const getValidPostcode = (): string => {
        if (prefix === "") {
            return "_";
        }
        return `${prefix.toUpperCase()} ${getValidSuffix()}`;
    }

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
                <p className="sample-postcode">{getValidPostcode()}</p>
            </div>
        </>
    );
}

function getRandomElement(inputList: any[] | string): any {
  const l = inputList.length;
  const i = Math.floor(l * Math.random());
  return inputList[i];
}

export default GetVariant;
