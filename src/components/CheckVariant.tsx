import React, { useState } from 'react';


interface CheckVariantProps {
    isVariant: (postcode: string) => boolean;
}

const CheckVariant: React.FC<CheckVariantProps> = ({ isVariant }) => {
    const [postcodeToCheck, setPostcodeToCheck] = useState<string>("");

    const getBucket = (postcode: string): string => {
        if (postcode === "") {
            return "_";
        }
        return isVariant(postcode) ? "variant_a" : "control";
    }

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
}

export default CheckVariant;
