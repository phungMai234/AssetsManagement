import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  content: PropTypes.string,
  status: PropTypes.oneOf(['success', 'danger']).isRequired,
  onHide: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  .close {
    z-index: 0;
  }
`;

const MessageRes = ({ content, status, onHide, timeout = 3000 }) => {
  useEffect(() => {
    if (!!content && timeout !== null) {
      setTimeout(() => {
        onHide();
      }, timeout);
    }
  }, [content, onHide, timeout]);

  return (
    <Wrapper className={`alert alert-${status} alert-dismissible fade show`} role="alert">
      {content}
      <button
        style={{ width: 'auto' }}
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onHide}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </Wrapper>
  );
};

MessageRes.propTypes = propTypes;

export default MessageRes;
