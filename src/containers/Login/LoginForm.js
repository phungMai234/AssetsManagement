import React from 'react';
import { Form, Button } from 'react-bootstrap';

import Wrapper from './Login.styles';
import MessageRes from 'components/MessageRes';
import { LogIn } from 'react-feather';
import useAlert from 'hooks/useAlert';
import { Link } from 'react-router-dom';

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
            <h6 className="logo-txt">Assets Management</h6>
          </div>
        </div>
        <div className="title">Đăng nhập hệ thống</div>
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
            <Form.Label>Mật khẩu</Form.Label>
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
          <div className="link-reset">
            <Link to="/auth/password_reset">Quên mật khẩu?</Link>
          </div>
          <Button variant="primary" size="sm" onClick={handleSubmit} onkeypress={handleSubmit}>
            <LogIn size={15} />
            Đăng nhập
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
