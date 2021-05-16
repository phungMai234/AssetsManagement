import styled from 'styled-components';

const Wrapper = styled.div`
  form {
    margin: 20px 0px;
  }
  .group-form {
    margin-bottom: 20px;
  }
  .wrapper-form {
    margin: 20px 0px;
  }
  .help-text {
    font-size: 13px;
    color: red;
  }

  .label-input {
    font-weight: bold;
    word-wrap: break-word;
  }

  .info-item {
    margin: 15px 0px;

    .default-title {
      margin-bottom: 5px;
    }

    .text-input {
      border: 1px solid #707070;
      border-radius: 3px;
      padding: 5px 15px;
      margin: 0px;
      width: 100%;
      position: relative;
    }

    .input-select {
      border: 1px solid #707070;
      background-color: #fff;
      border-radius: 3px;
      padding: 6px;
      width: 100%;
    }
  }

  .has-error {
    input,
    select,
    textarea {
      border-color: red !important;
    }

    .error {
      color: red;
      margin-bottom: unset;
    }
  }

  .btn-close {
    position: absolute;
    top: 0px;
    right: 13px;
    cursor: pointer;
  }

  .btn-add {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    span {
      margin-left: 5px;
    }
  }

  .wrapper-button {
    display: flex;
    justify-content: flex-end;
  }

  .wrapper-button-del {
    display: flex;
    align-items: flex-end;
    padding-right: unset;
    .btn-del {
      display: flex;
      align-items: center;
      height: 38px;
    }
  }

  .error {
    color: red;
    margin-top: 4px;
    font-size: 11px;
  }

  .name-asset {
    padding-right: unset;
  }

  .divide {
    border: 1px dashed #d9d9d9;
  }
`;
export default Wrapper;
