import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';
import CategoriesPage from './containers/CategoriesPage';
import ItemPage from './containers/ItemPage';
import Login from './containers/Login';

const App = () => {
  return (
    <Switch>
      <Route exact path="/dashboard/categories" component={CategoriesPage} />
      <Route exact path="/dashboard/item" component={ItemPage} />
      <Route exact path="/login" component={Login} />

      <Redirect to="/login" />
    </Switch>
  );
};

export default App;
