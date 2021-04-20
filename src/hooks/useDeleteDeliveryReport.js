import db from '../database';

import { useCallback, useState } from 'react';

import useAlert from 'hooks/useAlert';

const useDeleteDeliveryReport = ({ id, orderDetails, callback }) => {
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

    orderDetails.forEach((element) => {
      const ref = db.collection('orderDetails').doc(element.id);

      ref
        .delete()
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
  }, [callback, errorDel, orderDetails, recordRef, setAlert]);

  return [remove];
};

export default useDeleteDeliveryReport;
