import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BORROWING, BORROWING_TEXT, CLOSED, CLOSED_TEXT, DRAFT, DRAFT_TEXT } from 'utils/constant';

const Wrapper = styled.div`
  .draft {
    color: #ffc107;
  }

  .borrowing {
    color: #28a745;
  }

  .canceled {
    color: #dc3545;
  }

  .closed {
    color: #6c757d;
  }
`;

const StatusBorrow = ({ status }) => {
  const textStatus = useMemo(() => {
    switch (status) {
      case BORROWING:
        return BORROWING_TEXT;
      case CLOSED:
        return CLOSED_TEXT;
      case DRAFT:
        return DRAFT_TEXT;
      default:
        return '';
    }
  }, [status]);

  return (
    <Wrapper>
      <div className={status}>{textStatus}</div>
    </Wrapper>
  );
};

export default StatusBorrow;
