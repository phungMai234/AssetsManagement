import React, { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import Placeholder from './Placeholder';

const Wrapper = styled.div`
  background: ${({ dragging }) => (dragging ? '#2dafaf3b' : 'unset')} !important;
  border: 3px dashed #38b1b0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;

  .btn-upload {
    align-items: center;
    background: transparent;
    color: #38b1b0;
    cursor: pointer;
    display: flex;
    font-size: 15px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: -40px;
    font-weight: 400;
  }
`;

export default function DragDropWrapper({ children, onUpload, isShowPlaceHolder, placeholder, loading }) {
  const inputSelectFile = useRef();
  const dropRef = useRef();

  const [dragging, setDragging] = useState(false);

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      !loading && setDragging(true);
    },
    [loading],
  );

  const handleDragIn = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      !loading && setDragging(true);
    },
    [loading],
  );

  const handleDragOut = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      !loading && setDragging(false);
    },
    [loading],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (loading) return;
      setDragging(false);
      const { files } = e.dataTransfer;
      const file = files[0];

      // const newFiles = files.map((file) =>
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   }),
      // );
      // onUpload(newFiles);
      onUpload(file);
    },
    [loading, onUpload],
  );

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDrag);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDragIn);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDrag);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDragIn);
      div.removeEventListener('drop', handleDrop);
    };
  }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

  return (
    <Wrapper className="photo-list-wrapper" dragging={dragging} ref={dropRef}>
      {children}
      {isShowPlaceHolder && (
        <>
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            ref={inputSelectFile}
            accept=".jpeg,.png,.jpg"
            onClick={/* istanbul ignore next */ (event) => (event.target.value = '')}
            onChange={(event) => {
              const file = event.target.files[0];
              // console.log('files: ', files);
              // if (files.length === 0) {
              //   return;
              // }
              // // const newFiles = Object.assign(files[0], {
              // //   preview: URL.createObjectURL(files[0]),
              // // });

              onUpload(file);
            }}
          />
          <Placeholder
            placeholder={placeholder}
            onClickUpload={() => {
              !loading && inputSelectFile.current.click();
            }}
          />
        </>
      )}
    </Wrapper>
  );
}
