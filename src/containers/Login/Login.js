import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import { auth } from 'database';
import useAlert from 'hooks/useAlert';

const LoginPage = () => {
  const history = useHistory();
  const { setAlert } = useAlert();

  const handleLogin = useCallback(
    (values) => {
      const { email, password } = values;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          history.push('/dashboard/categories');
        })
        .catch((error) => {
          console.log('error');
          setAlert({ status: 'danger', message: error.message });
        });
    },
    [history, setAlert],
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Đây là trường bắt buộc '),
    password: Yup.string().required('Đây là trường bắt buộc '),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {(props) => <LoginForm {...props} />}
    </Formik>
  );
};

export default LoginPage;
