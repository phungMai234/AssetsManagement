import db, { firebase } from '../database';

import { useCallback } from 'react';

import useAlert from 'hooks/useAlert';

const useImportFile = ({ callback }) => {
  const { setAlert } = useAlert();

  const importFile = useCallback(
    (values) => {
      values.map((e) => {
        db.collection('devices')
          .add({
            ...e,
            purchase_date: firebase.firestore.Timestamp.fromDate(e.purchase_date),
          })
          .then(() => {})
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          });
      });
      !!callback && callback();
      setAlert({ status: 'success', message: 'Tạo mới thành công' });
    },
    [callback, setAlert],
  );

  return [importFile];
};

export default useImportFile;
