import React from 'react';
import DispatchContext from './DispatchContext';

const DispatchProvider = props => {

    return (
        <DispatchContext.Provider 
            value={{
                state: {
                    // put your state that you want to expose in here
                },
                // expose functions here
            }}
        >
            {props.children}
        </DispatchContext.Provider>
    )
};

export default DispatchProvider;