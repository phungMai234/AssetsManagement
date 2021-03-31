import React, { useRef, useMemo, useCallback } from 'react';

import DragAndDropWrapper from 'components/DragAndDropWrapper';
import Wrapper from './PhotoUpload.styles';
import { ProgressBar } from 'react-bootstrap';
import { XCircle, Upload } from 'react-feather';
import useUploadPhoto from '../../hooks/useUploadPhoto';
import { useField } from 'formik';

const PhotoUpload = ({ name }) => {
  const [{ value = [] }, { error, touched }, { setValue }] = useField({ name });

  const [uploadFiles, { loading }] = useUploadPhoto({
    name,
  });

  const inputSelectFile = useRef();

  const isUploading = useMemo(() => {
    return !!value.find(({ uploading }) => !!uploading);
  }, [value]);

  const handleUpload = useCallback(
    (args) => {
      if (isUploading) return;
      uploadFiles(args);
    },
    [isUploading, uploadFiles],
  );

  return (
    <Wrapper>
      <div className="wrapper-button-upload">
        <button
          onClick={() => {
            inputSelectFile.current.click();
          }}
        >
          <Upload size={15} />
          Chọn ảnh để tải lên
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            ref={inputSelectFile}
            accept=".jpeg,.png,.jpg"
            onClick={/* istanbul ignore next */ (event) => (event.target.value = '')}
            onChange={(event) => {
              const { files } = event.target;
              handleUpload(files);
            }}
          />
        </button>
      </div>

      <DragAndDropWrapper
        onUpload={handleUpload}
        loading={loading}
        isShowPlaceHolder={!value?.length}
        placeholder={'Tải lên không quá 5 ảnh, Các loại ảnh được chấp nhận: .jpg, .png, .jpeg'}
      >
        {(value || []).map((file) => (
          <>
            <div className={'thumb'} key={file.name}>
              <div className={'thumb-inner'}>
                <img className="img-item" src={file.photo} />
                <XCircle className="btn-close" onClick={() => console.log('log')} />
              </div>
            </div>
            {file.uploading && <ProgressBar striped variant="success" now={100} />}
          </>
        ))}
      </DragAndDropWrapper>
    </Wrapper>
  );
};

export default PhotoUpload;
