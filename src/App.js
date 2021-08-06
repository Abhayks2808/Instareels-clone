import React from 'react';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom'
import Feeds from './components/feeds';
import Login from './components/login';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider} from './context/Authcontext';
import Signup from './components/signup';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
       
      <AuthProvider>
      <Router>
      
       <Switch>
         <Route path="/login" exact component={Login}></Route>
         <Route path="/signup" exact component={Signup}></Route>
         <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
         <PrivateRoute path="/"  component={Feeds}></PrivateRoute>
       </Switch>
      </Router>
       
       </AuthProvider>
       
    </div>
  );
}


export default App;
