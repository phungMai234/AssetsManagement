import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { auth } from 'database';

const AuthRoute = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.id);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return <Route {...props}>{props.children}</Route>;
};

export default AuthRoute;
