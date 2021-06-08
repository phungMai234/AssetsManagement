import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    /* table-layout: fixed; */

    /* .index,
    .amount {
      width: 5%;
    }

    .import_date {
      width: 10%;
    }

    .picture {
      width: 8%;
    }
    .image {
      width: 8%;
    }
    .price_each {
      width: 10%;
    }

    .model_number {
      width: 13%;
    }
    .serial_number {
      width: 15%;
    }

    .name {
      width: 20%;
    }
    .group-button-action {
      width: 20%;
    } */

    .td-group-button-action {
      div {
        display: flex;
        flex-wrap: wrap;
      }
      width: 125px;
    }
    .button-action {
      margin-top: 5px;
      font-size: 10px;
      margin-left: 5px;
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
