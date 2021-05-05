import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    table-layout: fixed;

    .index,
    .amount {
      width: 7%;
    }

    .import_date {
      width: 8%;
    }

    .picture,
    .image,
    .price_each {
      width: 10%;
    }

    .model_number,
    .serial_number {
      width: 15%;
    }

    .name {
      width: 20%;
    }

    th {
      text-align: center;
      vertical-align: middle;
    }
    td {
      text-align: center;
      vertical-align: middle;
    }

    .td-picture {
      img {
        height: 50px;
        width: 50px;
      }
    }
  }
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
      margin-right: 20px;

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

  input,
  select {
    font-size: 14px;
    height: 38px;
  }
`;
export default Wrapper;
