import React, { useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .waiting {
    color: #ffc107;
  }

  .free {
    color: #28a745;
  }

  .in_use {
    color: #007bff;
  }

  .closed {
    color: #ff0000;
  }

  .remove {
    color: #6c757d;
  }
`;

const StatusAsset = ({ status }) => {
  const textStatus = useMemo(() => {
    switch (status) {
      case 'Mới mua':
        return 'free';
      case 'Đang sử dụng':
        return 'in_use';
      case 'Chưa sử dụng':
        return 'free';
      case 'Hỏng':
        return 'closed';
      case 'Đã thanh lý':
        return 'remove';
      case 'Đang bảo dưỡng':
        return 'waiting';
      default:
        return '';
    }
  }, [status]);

  return (
    <Wrapper>
      <div className={textStatus}>{status}</div>
    </Wrapper>
  );
};

export default StatusAsset;
