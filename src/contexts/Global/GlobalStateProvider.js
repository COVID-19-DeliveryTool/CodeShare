// All things that should be accessed in a global setting will live here
import React, {useState} from 'react';
import GlobalStateContext from './GlobalStateContext';

const GlobalStateProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);

    // const getUser = async () => {
    //  example of calling a stich function inside here
    //     const prom = await getUserStich();
    //     setUser(prop.user);
    // }
    
    return (
        <GlobalStateContext.Provider // this is where we expose state values and functions to the rest of the application
            value={{
                state: { // for organization reasons I like keep all state values inside a state object
                    isAuthenticated: isAuthenticated,
                    errors: errors,
                    user: user
                },
                setErrors: (errs) => setErrors(errs),
                setIsAuthenticated: (bool) => setIsAuthenticated(bool) // expose only the functions that are necessary
            }}
        >
            {props.children}
        </GlobalStateContext.Provider>
    )
};

export default GlobalStateProvider;