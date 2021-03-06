import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import RequestModule from './components/RequestModule/RequestModuleHome'
import DonationModule from './components/DonationModule/DonationModuleHome'
import Error from './components/Error'
import OrderComplete from './components/Order/OrderComplete';
import './css/App.css';
import './css/bootstrap.min.css'
import DispatchModuleHome from './components/DispatchModule/DispatchModuleHome';
import GlobalStateContext from './contexts/Global/GlobalStateContext';
import RequestContext from './contexts/RequestModule/RequestContext';
import DonationContext from './contexts/DonationModule/DonationContext';
import DispatchContext from './contexts/DispatcherModule/DispatchContext';

function App() {
  return (
    <GlobalStateContext.Consumer>
      {globalContext => (
        <BrowserRouter>
        <ToastContainer
            autoClose={5000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            className='toast-container'
            toastClassName="toastify-brand"
            progressClassName="toastify-progress-bar"
        />

        <Switch>
          <Route exact={true} path="/" render={(props) => <Home globalContext={globalContext} {...props}/>}/>
          <Route exact={true} path="/request" render={(props) => <RequestContext.Consumer>{requestContext => (<RequestModule globalContext={globalContext} requestContext={requestContext} {...props}/>)}</RequestContext.Consumer>}/>
          <Route exact={true} path="/donate" render={(props) => <DonationContext.Consumer>{donationContext => (<DonationModule globalContext={globalContext} donationContext={donationContext} {...props}/>)}</DonationContext.Consumer>}/>
          <Route exact={true} path="/dispatcher" render={(props) => <DispatchContext.Consumer>{dispatchContext => (<DispatchModuleHome globalContext={globalContext} dispatchContext={dispatchContext} {...props}/>)}</DispatchContext.Consumer>}/>
          <Route exact={true} path="/error" render={(props) => <DispatchContext.Consumer>{dispatchContext => (<Error globalContext={globalContext} dispatchContext={dispatchContext} {...props}/>)}</DispatchContext.Consumer>}/>
          <Route exact path='/order' render={props => <OrderComplete globalContext={globalContext}/>}/>
        </Switch>
      </BrowserRouter>
      )}
    </GlobalStateContext.Consumer>
  );
}

export default App;
