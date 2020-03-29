// All things that should be accessed in a global setting will live here
import React, {useState} from 'react';
import GlobalStateContext from './GlobalStateContext';
import {checkUserAuth,getUserInfo} from '../../lib/StitchFunctions'

const GlobalStateProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);

    const checkAuthStatus = async () =>{
        const prom = await checkUserAuth()
        setIsAuthenticated(prom)
    }

    const getUser = async () => {
     //example of calling a stich function inside here
        const prom = await getUserInfo()
        if(!prom) setErrors({...errors, login: 'We had trouble logging you in, please try again later.'})
        else setUser(prom);
    }
    
    return (
        <GlobalStateContext.Provider // this is where we expose state values and functions to the rest of the application
            value={{
                state: { // for organization reasons I like keep all state values inside a state object
                    isAuthenticated: isAuthenticated,
                    errors: errors,
                    user: user
                },
                setErrors: (errs) => setErrors(errs),
                setIsAuthenticated: (bool) => setIsAuthenticated(bool), // expose only the functions that are necessary
                checkAuthStatus: () => checkAuthStatus(),
                getUser: () => getUser()
            }}
        >
            {props.children}
        </GlobalStateContext.Provider>
    )
};

export default GlobalStateProvider;