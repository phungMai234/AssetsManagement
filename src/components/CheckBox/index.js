import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .wrapper-checkbox {
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    & input:checked ~ .checkmark:after {
      display: block;
    }

    & input:checked ~ .checkmark {
      background-color: #2196f3;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 1px solid #000;

      &:after {
        content: '';
        position: absolute;
        display: none;

        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
`;
const CheckBox = () => {
  return (
    <Wrapper>
      <label className="wrapper-checkbox">
        Two
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </Wrapper>
  );
};

export default CheckBox;
