import React from 'react';
import RequestContext from './RequestContext';

const RequestProvider = props => {

    return (
        <RequestContext.Provider 
            value={{
                state: {
                    // state values you want to expose go here
                },
                // functions you want to expose go here
            }}
        >
            {props.children}
        </RequestContext.Provider>
    )
};

export default RequestProvider;