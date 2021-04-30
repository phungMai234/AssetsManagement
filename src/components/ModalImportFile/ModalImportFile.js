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
    'Ngay mua': {
      prop: 'purchase_date',
      type: Date,
    },
    Ten: {
      prop: 'name',
    },
    'Ma code': {
      prop: 'serial_number',
    },
    'Ma kieu': {
      prop: 'model_number',
    },
    'Mo ta': {
      prop: 'description',
    },
    'Tinh trang': { prop: 'current_status' },
    'Loai tai san': { prop: 'id_category' },
    'So luong': { prop: 'amount' },
    'Don vi': { prop: 'unit' },
    'Don gia': { prop: 'price_each' },
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
