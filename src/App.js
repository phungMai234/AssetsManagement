import React from 'react';
import './App.css';
import Home from './containers/Home';
import Profile from './containers/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />

      <Redirect to="/" />
    </Switch>
  );
};

export default App;
