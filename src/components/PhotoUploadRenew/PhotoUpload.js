import React from 'react';

import { useDropzone } from 'react-dropzone';
import Wrapper, { CustomDropzone } from './PhotoUpload.styles';
import { XCircle, UploadCloud } from 'react-feather';
import useUploadImage from 'hooks/useUploadImage';
import useDeleteImage from 'hooks/useDeleteImage';
import { useField } from 'formik';

const PhotoUpload = ({ name, setSubmitting }) => {
  const [uploadImage] = useUploadImage({ name, setSubmitting });
  const [deleteImage] = useDeleteImage(name);
  const [{ value }, , {}] = useField({ name });

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        uploadImage(file);
      });
    },
  });

  return (
    <Wrapper>
      <CustomDropzone {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <div className="placeholder">
          <UploadCloud size={40} />
          <div>Kéo thả, hoặc click chọn ảnh tại đây </div>
        </div>
      </CustomDropzone>
      {isDragReject && <p className="help-text">Loại tệp không được chấp nhận, chỉ được tải lên tối đa 2 ảnh </p>}
      <aside className="thumbsContainer">
        {(value || []).map((file) => (
          <div className="thumb" key={file.path}>
            <div className="thumb-inner">
              <img src={file.preview} />
            </div>
            {file.preview && <XCircle className="btn-close" onClick={() => deleteImage(file)} />}
          </div>
        ))}
      </aside>
    </Wrapper>
  );
};

export default PhotoUpload;
