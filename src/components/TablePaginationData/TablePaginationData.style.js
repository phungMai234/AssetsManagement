import styled from 'styled-components';

const Wrapper = styled.div`
  .wrapper-select {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px;
    align-items: center;
    label {
      margin: 0px 5px;
    }
    select {
      border: 1px solid #007bff;
      background-color: #fff;
      border-radius: 3px;
      padding: 5px;
    }
  }
  .wrapper-option {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px;
  }
  .wrapper-table {
    max-height: 400px;
    overflow: auto;
    table {
      thead {
        th {
          border-bottom: 1px solid #000;
          position: sticky;
          top: -1px;
          z-index: 2px;
          background-color: #fff;
        }
      }
      tbody {
        td {
          border-bottom: 1px dotted #bfbfbf;
          vertical-align: baseline;
        }
        tr:hover {
          background-color: #2cb1b01c;
        }
      }
    }
  }
`;
export default Wrapper;
