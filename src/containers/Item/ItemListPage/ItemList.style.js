import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
      vertical-align: middle;
    }
    .td-manager {
      width: 15%;
      word-wrap: break-word;
    }

    .td-picture {
      img {
        height: 50px;
        width: 50px;
      }
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

  .row-button {
    display: flex;
    align-items: center;

    .btn-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;

      span {
        margin-left: 5px;
      }
    }

    .btn-import {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }

  .input-select {
    background-color: #fff;
    border-radius: 3px;
    padding: 6px;
    width: 200px;
  }
`;
export default Wrapper;
