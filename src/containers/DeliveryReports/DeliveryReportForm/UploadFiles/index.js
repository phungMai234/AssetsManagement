import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { FileText, Upload } from 'react-feather';
import { useField } from 'formik';

import ClearButton from 'components/ClearButton';
import useUploadFiles from 'hooks/useUploadFiles';
import styled from 'styled-components';
import useDeleteFile from 'hooks/useDeleteFile';
import { Spinner } from 'react-bootstrap';

const Wrapper = styled.div`
  .upload-button {
    border: 1px solid #007bff;
    padding: 5px 20px;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
  }

  .item-file {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    font-size: 16px;

    .btn-clear-file {
      margin-left: 10px;
    }
    span {
      margin-left: 5px;
    }
  }
`;
const UploadFiles = ({ name, errors, touched, setSubmitting }) => {
  const [{ value = [] }, , {}] = useField({ name });

  const [uploadFiles, { loading }] = useUploadFiles({ name, setSubmitting });
  const [deleteFile] = useDeleteFile(name);

  return (
    <Wrapper>
      <Row>
        <Col md={12} className="sub-content upload-file">
          <label htmlFor="upload_file" className="upload-button">
            {loading ? (
              <div>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <Upload size={20} />
                Tải tệp *.pdf, *.doc
              </div>
            ) : (
              <div>
                <Upload size={20} />
                Tải tệp *.pdf, *.doc
              </div>
            )}
          </label>
          {!loading && (
            <input
              type="file"
              id="upload_file"
              name="files"
              multiple
              hidden
              onChange={(event) => {
                event.preventDefault();
                uploadFiles(event.target.files[0]);
              }}
            />
          )}
          {value.map((file, index) => (
            <div key={index} className="item-file">
              <a href={file.url} target="_blank" rel="noreferrer">
                <FileText size={20} />
                <span>{file.name}</span>
              </a>
              {!!file.name && <ClearButton onClick={() => deleteFile(file)} size="medium" className="btn-clear-file" />}
            </div>
          ))}

          {/* {!!fileError && <p className="error">{fileError.internalError}</p>} */}
          {!!touched?.files && !!errors?.files && <p className="error">{errors?.files}</p>}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default UploadFiles;
