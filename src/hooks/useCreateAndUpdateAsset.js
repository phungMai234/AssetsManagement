import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { db, firebase } from 'database';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const useCreateAndUpdateAsset = ({ data }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const update = useCallback(
    (values, actions) => {
      const cloneValues = { ...values };

      const formatValues = {
        ...cloneValues,
        purchase_date: firebase.firestore.Timestamp.fromDate(values.purchase_date),
      };

      if (data) {
        db.collection('assets')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            history.push(`/dashboard/assets`);
            setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
          })
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          })
          .finally(() => {
            actions.setSubmitting(false);
            focusOnTop();
          });
        return;
      }
      db.collection('assets')
        .add({ ...formatValues })
        .then(() => {
          history.push(`/dashboard/assets`);
          setAlert({ status: 'success', message: 'Tạo mới thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        })
        .finally(() => {
          actions.setSubmitting(false);
          focusOnTop();
        });
    },
    [data, history, setAlert],
  );

  return [update];
};

export default useCreateAndUpdateAsset;
