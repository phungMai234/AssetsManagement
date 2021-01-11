import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      Login <Link to="/dashboard/categories">go to Home</Link>
    </div>
  );
};

export default Login;
