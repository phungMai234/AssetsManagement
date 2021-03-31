import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  .icon-calendar {
    color: #fff;
    font-size: 20px;
    padding: 0px 7px;
    background-color: #007bff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .date-picker-input {
    padding: 5px;
    border: 1px solid #707070;
    background-color: #fff;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  input {
    width: 100%;
  }
`;
export default Wrapper;
