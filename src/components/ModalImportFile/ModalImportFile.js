import React, { useCallback, useState } from 'react';
import BaseModal from 'components/BaseModal';

import readXlsxFile from 'read-excel-file';
import useImportFile from 'hooks/useImportFile';

const ModalImportFile = ({ onCancel }) => {
  const [importData, setImportData] = useState([]);

  const map = {
    Ten: 'name',
    'Ma code': 'code',
    'Ngay mua': 'purchase_date',
    'Tinh trang': 'current_status',
    'Dong san pham': 'id_productline',
    'So luong': 'amount',
    'Don vi': 'unit',
    'Don gia': 'price_each',
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
      prop: 'code',
    },
    'Tinh trang': { prop: 'current_status' },
    'Dong san pham': { prop: 'id_productline' },
    'So luong': { prop: 'amount' },
    'Don vi': { prop: 'unit' },
    'Don gia': { prop: 'price_each' },
  };

  const handleUploadFile = useCallback((e) => {
    const file = e.target.files[0];

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
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
    />
  );
};

export default ModalImportFile;
