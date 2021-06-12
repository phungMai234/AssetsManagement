import React, { useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .pending {
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
    text-decoration: line-through;
  }
`;

const StatusBorrow = ({ status }) => {
  const textStatus = useMemo(() => {
    switch (status) {
      case 'pending':
        return 'Đang chờ xác nhận';
      case 'borrowing':
        return 'Đang mượn';
      case 'canceled':
        return 'Đã hủy';
      case 'closed':
        return 'Đã đóng';
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
