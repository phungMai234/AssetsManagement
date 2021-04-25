import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import MessageRes from 'components/MessageRes';
import useAlert from 'hooks/useAlert';
import styled from 'styled-components';
import { Send } from 'react-feather';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .wrapper-form {
    width: 400px;
    border: 1px solid #6666;
    background-color: #fff;
    border-radius: 3px;
  }
  .header-login {
    padding: 20px 0px;
  }

  .title {
    padding: 0 25px 10px 25px;
    font-size: 16px;
    font-weight: bold;
  }
  .footer-login {
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
    padding: 10px 25px;

    svg {
      margin-right: 5px;
    }
  }
  form {
    padding: 25px;
    border-top: 1px solid #ddd;

    .form-label {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .wrapper-button {
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 20px;
  }
`;

const PasswordReset = () => {
  const { alert, clearAlert } = useAlert();
  const [email, setEmail] = useState();

  return (
    <Wrapper>
      <div className="wrapper-form">
        <div className="header-login">
          <div className="title">
            Nhập địa chỉ email của tài khoản đã xác minh của bạn và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu.
          </div>
        </div>
        <Form>
          {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}

          <Form.Group>
            <Form.Control
              name="email"
              placeholder="Nhập địa chỉ email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="footer-login">
          <Button variant="primary" size="sm">
            <Send size={15} />
            Gửi
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PasswordReset;
