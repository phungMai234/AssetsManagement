import React from 'react';

import PropTypes from 'prop-types';
import { X } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #7d7d7d;
  padding: 0;
  display: flex;
  border-radius: 20px;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const styles = {
  large: { wrapper: 30, icon: 20 },
  medium: { wrapper: 23, icon: 16 },
  small: { wrapper: 16, icon: 14 },
};

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

const ClearButton = ({ size = 'small', onClick, ...props }) => {
  return (
    <Wrapper className="clear-button" size={styles[size].wrapper} onClick={onClick} {...props}>
      <X size={15} strokeWidth={size === 'medium' ? 3 : 2} color="#fff" />
    </Wrapper>
  );
};

ClearButton.propTypes = propTypes;

export default ClearButton;
