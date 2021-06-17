import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';
import 'react-datepicker/dist/react-datepicker.css';

import routes from './routes/index';
import { auth } from 'database';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
      } else {
        // No user is signed in.
      }
    });
  }, [currentUser]);

  console.log({ currentUser });
  return (
    <Switch>
      {(routes || []).map((route, index) => {
        if (route.authentication) {
          if (!currentUser) {
            history.replace('/auth/login');
          } else {
            return (
              <Route key={index} exact={route.exact} path={route.path}>
                {route.component}
              </Route>
            );
          }
        }

        return (
          <Route key={index} exact={route.exact} path={route.path}>
            {route.component}
          </Route>
        );
      })}

      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default App;
