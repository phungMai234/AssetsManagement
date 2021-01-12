import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
    }
    .td-manager {
      width: 15%;
      word-wrap: break-word;
    }
  }
  margin: 5px;
  .row {
    margin-bottom: 20px;
  }
  .border-place {
    border-left: 1px solid #bfbfbf;
    display: flex;
    align-items: center;
    button {
      margin-right: 10px;
      i {
        padding-right: 5px;
      }
    }
  }
`;
export default Wrapper;
