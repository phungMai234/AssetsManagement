import React, { useCallback, useState } from 'react';
import BaseModal from 'components/BaseModal';

import readXlsxFile from 'read-excel-file';
import useImportFileLecture from 'hooks/useImportFileLectures';
import Wrapper from './ModalImportFile.styles';

const ModalImportFile = ({ onCancel }) => {
  const [importData, setImportData] = useState([]);
  const [errors, setErrors] = useState();

  const schema = {
    Tên: {
      prop: 'name',
      required: true,
    },
    Email: {
      prop: 'email',
      required: true,
    },
    'Ghi chú': {
      prop: 'note',
    },
  };

  const handleUploadFile = useCallback((e) => {
    const file = e.target.files[0];

    readXlsxFile(file, { schema })
      .then(({ rows, errors }) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          setImportData(rows);
        }
      })
      .catch((error) => !!error && setErrors('Lỗi định dạng file. Vui lòng kiểm tra lại file khi tải lên '));
  }, []);

  const [handleImportFile] = useImportFileLecture({ callback: () => onCancel() });

  return (
    <BaseModal
      show={true}
      title="Nhập danh sách cán bộ bằng file excel"
      confirmText="Tạo"
      cancelText="Hủy bỏ"
      disableBtnConfirm={!!errors && !!errors.length}
      content={
        <Wrapper>
          <input type="file" onChange={handleUploadFile} />
          {!!errors && typeof errors !== 'string' && !!errors?.length && (
            <>
              <div className="help">Lỗi các trường khi tải file: </div>
              {errors.map((error, index) => (
                <div key={index} className="error">
                  <code>{error.error}</code>
                  {' for value '}
                  <code>{error.value}</code>
                  {' in column '}
                  <code>{error.column}</code>
                  {error.type && ' of type '}
                  {error.type && <code>{error.type.name}</code>}
                  {' in row '}
                  <code>{error.row}</code>
                </div>
              ))}
            </>
          )}
          {!!errors && typeof errors === 'string' && <div className="help">{errors}</div>}
        </Wrapper>
      }
      onCancel={() => onCancel()}
      onConfirm={() => handleImportFile(importData)}
      typeBtnConfirm="success"
    />
  );
};

export default ModalImportFile;
