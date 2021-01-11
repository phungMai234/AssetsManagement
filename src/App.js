import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { routes } from './routes';
import Login from './containers/Login';

const App = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route
        path="/dashboard"
        render={({ history, match }) => (
          <Router routes={routes} history={history} basename={match.url}>
            <Suspense fallback={null}>
              <View />
            </Suspense>
          </Router>
        )}
      />
      <Redirect to="/login" />
    </Switch>
  );
};

export default hot(App);
