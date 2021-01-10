import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router-dom';
import CategoriesPage from './containers/CategoriesPage';
import ItemPage from './containers/ItemPage';
import Login from './containers/Login';
import React from 'react';

const App = () => {
  return (
    <Switch>
      <Route exact path="/dashboard/categories" component={CategoriesPage} />
      <Route exact path="/dashboard/item" component={ItemPage} />
      <Route path="/login" component={Login} />

      <Redirect to="/login" />
    </Switch>
  );
};

export default hot(App);
