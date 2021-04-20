import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';

import routes from './routes/index';
import AuthRoute from './AuthRoute';

const App = () => {
  return (
    <Switch>
      {(routes || []).map((route, index) => (
        <Route key={index} exact={route.exact} path={route.path}>
          {route.component}
        </Route>
      ))}

      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default App;
