import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import RequestModule from './components/RequestModule/RequestModuleHome'
import DonationModule from './components/DonationModule/DonationModuleHome'
import './css/App.css';
import './css/bootstrap.min.css'
import DispatchModuleHome from './components/DispatchModule/DispatchModuleHome';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
      />

      <Switch>
          <Route exact={true} path="/" render={(props) => <Home {...props}/>}/>
          <Route exact={true} path="/request" render={(props) => <RequestModule {...props}/>}/>
          <Route exact={true} path="/donate" render={(props) => <DonationModule {...props}/>}/>
          <Route exact={true} path="/dispatch" render={(props) => <DispatchModuleHome {...props}/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
