import styled from 'styled-components';
import logo from 'assets/images/background.jpg';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;

  .wrapper-form {
    width: 400px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 3px;
  }
  .header-login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    & > div {
      text-align: center;
    }

    .logo-txt {
      font-weight: bold;
    }
  }

  .footer-login {
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
    padding: 25px;
  }
  form {
    padding: 25px;
    border-top: 1px solid #ddd;

    .form-label {
      font-weight: bold;
    }
  }

  .wrapper-button {
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 20px;
  }
  h2 {
    width: 100%;
    text-align: center;
    color: #1b548c;
    margin-bottom: 20px;
  }
`;
