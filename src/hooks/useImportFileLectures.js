import db from '../database';

import { useCallback, useState } from 'react';

import useAlert from 'hooks/useAlert';

const useImportFileLecture = ({ callback, setSubmitting }) => {
  const { setAlert } = useAlert();

  const importFile = useCallback(
    async (values) => {
      setSubmitting(true);
      await values.map((e) => {
        db.collection('lecturers')
          .add({
            ...e,
          })
          .then(() => {})
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          });
      });
      setSubmitting(false);
      !!callback && callback();
      setAlert({ status: 'success', message: 'Tạo mới thành công' });
    },
    [callback, setAlert, setSubmitting],
  );

  return [importFile];
};

export default useImportFileLecture;
