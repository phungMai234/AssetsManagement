import db from '../database';

import { useCallback } from 'react';

import useAlert from 'hooks/useAlert';
import { IN_USE } from 'utils/constant';

const useDeleteAsset = ({ id, status, callback }) => {
  const { setAlert } = useAlert();

  const recordRef = db.collection('assets').doc(id);

  const remove = useCallback(() => {
    if (status === IN_USE) {
      setAlert({ status: 'warning', message: 'Tài sản đang sử dụng, không thể xóa!' });
      return;
    }
    recordRef
      .delete()
      .then(() => {
        setAlert({ status: 'success', message: 'Đã xóa bản ghi thành công' });
        !!callback && callback();
      })
      .catch(() => {
        setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
      });
  }, [callback, recordRef, setAlert, status]);

  return [remove];
};

export default useDeleteAsset;
