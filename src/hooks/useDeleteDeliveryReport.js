import db from '../database';

import { useCallback, useState } from 'react';

import useAlert from 'hooks/useAlert';
import { FREE } from 'utils/constant';

const useDeleteDeliveryReport = ({ id, data, callback }) => {
  const { setAlert } = useAlert();
  const [errorDel, setErrorDel] = useState(false);

  const recordRef = db.collection('orders').doc(id);

  const remove = useCallback(() => {
    recordRef
      .delete()
      .then(() => {})
      .catch(() => {
        setErrorDel(true);
      });

    data.list_id.forEach((e) => {
      db.collection('assets')
        .doc(e)
        .update({ status: FREE })
        .then(() => {})
        .catch(() => {
          setErrorDel(true);
        });
    });

    if (errorDel) {
      setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại' });
    } else {
      !!callback && callback();
      setAlert({ status: 'success', message: 'Đã xóa bản ghi thành công' });
    }
  }, [callback, data.list_id, errorDel, recordRef, setAlert]);

  return [remove];
};

export default useDeleteDeliveryReport;
