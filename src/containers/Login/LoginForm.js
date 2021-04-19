import React from 'react';
import { Form, Button } from 'react-bootstrap';

import Wrapper from './Login.styles';

const LoginForm = ({ handleSubmit, setFieldValue, handleChange, errors, values, touched }) => {
  console.log('values: ', values);
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
        <Form onSubmit={() => handleSubmit()}>
          <Form.Group>
            <Form.Label>Email2</Form.Label>
            <Form.Control
              name="email2"
              value={values?.email2}
              onChange={(e) => setFieldValue('email2', e.target.value)}
              isInvalid={!!touched?.email2 && !!errors?.email2}
            />
            <Form.Control.Feedback type="invalid">{errors?.email2}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password2"
              value={values?.password2}
              onChange={handleChange}
              isInvalid={!!touched?.password2 && !!errors?.password2}
            />
            <Form.Control.Feedback type="invalid">{errors?.password2}</Form.Control.Feedback>
          </Form.Group>
          <div className="footer-login">
            <Button variant="primary" size="sm" type="submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
