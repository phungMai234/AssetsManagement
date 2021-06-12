import db from '../database';

import { useCallback } from 'react';

import useAlert from 'hooks/useAlert';

const useImportFileLecture = ({ callback }) => {
  const { setAlert } = useAlert();

  const importFile = useCallback(
    (values) => {
      values.map((e) => {
        db.collection('lecturers')
          .add({
            ...e,
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

export default useImportFileLecture;
