import React from 'react';
import Wrapper from './Login.styles';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Wrapper>
      <div className="form-login">
        <h2>Đăng nhập</h2>
        <form>
          <div class="form-group">
            <label>Mã người dùng: </label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Mật khẩu:</label>
            <input type="password" class="form-control" />
          </div>
          <div className="wrapper-button">
            <Link to="/dashboard/categories">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
