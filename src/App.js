import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';

import './App.css';
import './components/AuthScreen'
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';

function App() {

  const token = useSelector(state => state.auth.token)
  const redirectPath = token ? '/dashboard' : '/auth'
  console.log('token: ', token)
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          {token && <Redirect to={redirectPath} />}
          <AuthScreen />
        </Route>
        <Route path="/dashboard">
          {!token && <Redirect to={redirectPath} />}
          <Dashboard />
        </Route>
        <Route path="/">
          <Redirect to={redirectPath} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
