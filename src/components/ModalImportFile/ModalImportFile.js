import React, { useCallback, useState } from 'react';
import BaseModal from 'components/BaseModal';

import readXlsxFile from 'read-excel-file';
import useImportFile from 'hooks/useImportFile';
import { useQuery } from 'hooks/useQuery';
import { getIdCategory } from 'utils/helper';
import Wrapper from './ModalImportFile.styles';
import { STATUS_LIST } from 'utils/constant';

const ModalImportFile = ({ onCancel }) => {
  const [importData, setImportData] = useState([]);
  const [errors, setErrors] = useState();
  const { data: dataCate, loading } = useQuery({ url: 'categories' });

  const schema = {
    'Ngày mua': {
      prop: 'purchase_date',
      required: true,
      type: Date,
    },
    'Tên thiết bị': {
      prop: 'name',
      required: true,
    },
    'Mã tài sản': {
      prop: 'serial_number',
      required: true,
    },
    Model: {
      prop: 'model_number',
      required: true,
    },
    'Mô tả': {
      prop: 'description',
    },
    'Tình trạng hiện nay': { prop: 'status', required: true, oneOf: STATUS_LIST },
    'Loại tài sản': {
      prop: 'id_category',
      required: true,
    },
    'Đơn vị tính': { prop: 'unit' },
    'Nguyên giá (VNĐ)': { prop: 'original_price' },
    'Giá trị còn lại (VNĐ)': { prop: 'real_price' },
    'Nơi sản xuất': { prop: 'origin' },
  };

  const handleUploadFile = useCallback(
    (e) => {
      const file = e.target.files[0];

      readXlsxFile(file, { schema })
        .then(({ rows, errors }) => {
          if (errors.length) {
            setErrors(errors);
          } else {
            const result = rows.map((e) => ({ ...e, id_category: getIdCategory(dataCate, e.id_category) }));
            setImportData(result);
          }
        })
        .catch((error) => !!error && setErrors('Lỗi định dạng file. Vui lòng kiểm tra lại file khi tải lên '));
    },
    [dataCate],
  );
  const [handleImportFile] = useImportFile({ callback: () => onCancel() });

  return (
    <BaseModal
      show={true}
      title="Nhập danh sách tài sản bằng file excel"
      confirmText="Tạo"
      cancelText="Hủy bỏ"
      disableBtnConfirm={!!errors && !!errors.length}
      content={
        !loading && (
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
        )
      }
      onCancel={() => onCancel()}
      onConfirm={() => handleImportFile(importData)}
      typeBtnConfirm="success"
    />
  );
};

export default ModalImportFile;
