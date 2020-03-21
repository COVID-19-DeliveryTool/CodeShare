import React from 'react';
import DonationContext from './DonationContext';

const DonationProvider = props => {

    return(
        <DonationContext.Provider
            value={{
                state: {
                    // put state values here
                },
                // put functions you want to expose here
            }}
        >
            {props.children}
        </DonationContext.Provider>
    )
}

export default DonationProvider;