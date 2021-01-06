import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .icon-search {
    color: #fff;
    font-size: 18px;
    padding: 0px 7px;
    border: 1px solid #007bff;
    background-color: #007bff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    align-items: center;
    display: flex;
  }

  .input-search {
    padding: 5px;
    border: 1px solid #007bff;
    background-color: #fff;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;
export default Wrapper;
