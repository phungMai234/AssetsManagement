import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 5px;
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
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
    stroke: #000;
  }
`;
export default Wrapper;
