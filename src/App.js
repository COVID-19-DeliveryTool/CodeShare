import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import MenuBar from './components/MenuBar'
import RequestModule from './components/RequestModule/RequestModuleHome'
import AuthModule from './components/AuthModule/AuthModule'

import './css/App.css';
import './css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      {/* <MenuBar/> */}
      {/* <Sidebar/> */}
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
          {/* If url points to our home page, determine the correct home page to show*/}
          <Route exact={true} path="/" render={(props) => <Home {...props}/>}/>
          <Route exact={true} path="/request" render={(props) => <RequestModule {...props}/>}/>
          <Route exact={true} path="/dispatcher" render={(props) => <AuthModule{...props}/> } />
          {/* <Route exact={true} path="/dispatcher" render={(props) => <RequestModule{...props}/> } /> */}
          {/* <Route path="/dashboard" render={(props) => shouldRedirectFromDashboard()}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
