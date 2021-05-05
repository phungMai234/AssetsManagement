import React, { useCallback, useState } from 'react';
import BaseModal from 'components/BaseModal';

import readXlsxFile from 'read-excel-file';
import useImportFile from 'hooks/useImportFile';

const ModalImportFile = ({ onCancel }) => {
  const [importData, setImportData] = useState([]);

  const map = {
    'Ma code': 'serial_number',
    'Ma kieu': 'model_number',
    Ten: 'name',
    'Ngay mua': 'purchase_date',
    'Tinh trang': 'current_status',
    'Loai tai san': 'id_category',
    'So luong': 'amount',
    'Don vi': 'unit',
    'Don gia': 'price_each',
    'Mo to': 'description',
  };

  const schema = {
    'Ngày mua': {
      prop: 'purchase_date',
      type: Date,
    },
    Tên: {
      prop: 'name',
    },
    'Số seri': {
      prop: 'serial_number',
    },
    'Số kiểu': {
      prop: 'model_number',
    },
    'Mô tả': {
      prop: 'description',
    },
    'Tình trạng': { prop: 'current_status' },
    'Loai tài sản': { prop: 'id_category' },
    'Số lượng': { prop: 'amount' },
    'Đơn vị': { prop: 'unit' },
    'Đơn giá': { prop: 'price_each' },
  };

  const handleUploadFile = useCallback((e) => {
    const file = e.target.files[0];

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
      console.log('row:', rows);

      setImportData(rows);
    });
  }, []);

  const [handleImportFile] = useImportFile({ callback: () => onCancel() });

  return (
    <BaseModal
      show={true}
      title="Nhập danh sách tài sản bằng file excel"
      confirmText="Tạo"
      cancelText="Hủy bỏ"
      content={<input type="file" onChange={handleUploadFile} />}
      onCancel={() => onCancel()}
      onConfirm={() => handleImportFile(importData)}
      typeBtnConfirm="success"
    />
  );
};

export default ModalImportFile;
