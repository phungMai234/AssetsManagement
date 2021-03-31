import db from '../database';

import { useCallback } from 'react';

import useAlert from 'hooks/useAlert';

const useDeleteRecord = ({ id, nameCollection, callback }) => {
  const { setAlert } = useAlert();

  const recordRef = db.collection(nameCollection).doc(id);

  const remove = useCallback(() => {
    recordRef
      .delete()
      .then(() => {
        setAlert({ status: 'success', message: 'Đã xóa bản ghi thành công' });
        !!callback && callback();
      })
      .catch(() => {
        setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
      });
  }, [callback, recordRef, setAlert]);

  return [remove];
};

export default useDeleteRecord;
