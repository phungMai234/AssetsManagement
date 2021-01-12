import styled from 'styled-components';

const Wrapper = styled.div`
  .header-detail {
    margin: 10px 0px;
    button {
      margin-right: 10px;
      background-color: #ffcc00;
      border: 1px solid #ffcc00;
      border-radius: 3px;
      padding: 5px;
      i {
        padding-right: 5px;
      }
    }
  }
  .body-detail {
    margin-top: 20px;
  }
  .group-form {
    margin-bottom: 20px;
    label {
      font-weight: bold;
    }
    input {
      border: 1px solid #007bff;
      padding: 5px 10px;
      border-radius: 3px;
      width: 250px;
    }
  }
`;
export default Wrapper;
