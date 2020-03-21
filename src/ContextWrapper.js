// manage the context providers in here, this function will just return the context providers which wraps app.js
// global state is the only provider and consumer most likely in here
import React from 'react';
import GlobalStateProvider from "./contexts/Global/GlobalStateProvider";
import GlobalStateContext from "./contexts/Global/GlobalStateContext";
import DonationProvider from "./contexts/DonationModule/DonationProvider";
import RequestProvider from './contexts/RequestModule/RequestProvider';
import DispatchProvider from './contexts/DispatcherModule/DispatchProvider';

// if you want you can pass the globalContext right into your provider as a prop. It will then be available
export default props => (
    <GlobalStateProvider>
        <GlobalStateContext.Consumer>
            {globalContext => (
                <DonationProvider>
                    <RequestProvider>
                        <DispatchProvider>
                            {props.children}
                        </DispatchProvider>
                    </RequestProvider>
                </DonationProvider>
            )}
        </GlobalStateContext.Consumer>
    </GlobalStateProvider>
)