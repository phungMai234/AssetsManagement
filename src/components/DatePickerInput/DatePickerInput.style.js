import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .icon-calendar {
    color: #495057;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    background-color: #e9ecef;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 1px solid #ced4da;
    border-right: unset;
  }
  .date-picker-input {
    padding: 5px;
    border: 1px solid #ced4da;
    background-color: #fff;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    width: 100%;
    height: 38px;
  }
  .react-datepicker__close-icon::after {
    height: 22px;
    width: 22px;
    font-size: 18px;
    background-color: #707070;
    font-weight: 600;
  }
`;
export default Wrapper;
