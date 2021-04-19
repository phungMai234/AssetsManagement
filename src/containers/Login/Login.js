import React, { useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = useCallback(() => {
    // history.push('/dashboard/categories');
    console.log('login');
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().required('Đây là trường bắt buộc '),
    password: Yup.string().required('Đây là trường bắt buộc '),
  });

  return (
    <Formik
      initialValues={{ email2: '', password2: '' }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {(props) => <LoginForm {...props} />}
    </Formik>
  );
};

export default LoginPage;
