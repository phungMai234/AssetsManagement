import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Wrapper from './Login.styles';
import MessageRes from 'components/MessageRes';

import useAlert from 'hooks/useAlert';

const LoginForm = ({ handleSubmit, handleChange, errors, values, touched }) => {
  const { alert, clearAlert } = useAlert();

  return (
    <Wrapper>
      <div className="wrapper-form">
        <div className="header-login">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Flogo2_new.png?alt=media&token=338cbb32-2c47-4945-bfcd-081bf460eb54"
              alt="logo"
            />
            <h6 className="logo-txt">UET Financial Management</h6>
          </div>
        </div>
        <Form>
          {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={values?.email}
              onChange={handleChange}
              isInvalid={!!touched?.email && !!errors?.email}
            />
            <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={values?.password}
              onChange={handleChange}
              isInvalid={!!touched?.password && !!errors?.password}
            />
            <Form.Control.Feedback type="invalid">{errors?.password}</Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div className="footer-login">
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
