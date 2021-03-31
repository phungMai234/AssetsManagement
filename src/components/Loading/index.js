import React from 'react';

import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </LoadingWrapper>
  );
};

export default Loading;
