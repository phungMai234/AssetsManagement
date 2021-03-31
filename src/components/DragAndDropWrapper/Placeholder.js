import React from 'react';

import { UploadCloud } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  color: #38b1b0 !important;
  margin: 0 auto;

  p {
    margin-bottom: 10px !important;
    color: #38b1b0 !important;
  }

  button {
    font-size: 13px;
    margin-top: 10px;
  }
`;

export default function Placeholder({ onClickUpload, placeholder }) {
  return (
    <Wrapper>
      <UploadCloud size={60} />
      <p style={{ fontSize: 16 }}>Kéo thả ảnh</p>
      {placeholder && <p style={{ fontSize: 12 }}>{placeholder}</p>}
      <button
        onClick={(event) => {
          event.preventDefault();
          onClickUpload && onClickUpload();
        }}
      >
        Chọn ảnh để tải lên
      </button>
    </Wrapper>
  );
}
