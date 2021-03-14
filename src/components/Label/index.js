import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  .default-title {
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
  .operator-require {
    color: #ff0000;
    font-size: 14px;
    top: -6px;
  }
`;

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isRequired: PropTypes.bool,
};

const Label = ({ children, isRequired }) => {
  return (
    <Wrapper>
      <label className="default-title">
        {children}
        {isRequired && <sup className="operator-require">*</sup>}
      </label>
    </Wrapper>
  );
};

Label.propTypes = propTypes;

export default Label;
