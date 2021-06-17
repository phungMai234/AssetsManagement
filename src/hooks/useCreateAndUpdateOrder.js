import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from 'database';
import useAlert from 'hooks/useAlert';
import { getUnixTime } from 'utils/helper';
import focusOnTop from 'utils/focusOnTop';
import { difference } from 'lodash';
import { CLOSED, FREE, IN_USE } from 'utils/constant';

const useCreateAndUpdateOrder = ({ data, listId }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const update = useCallback(
    (values, actions) => {
      actions.setSubmitting(true);
      const cloneValues = { ...values };
      const { orderDetails } = cloneValues;

      const formatOrderDetails = orderDetails.map((e) => ({
        id: e.device_info.id,
      }));
      const listIdSelected = orderDetails.map((e) => e.device_info.id);
      const listIdNotSelect = difference(listId, listIdSelected);

      const formatValues = {
        ...cloneValues,
        user_name: cloneValues.user_name.label,
        date_borrowed: { seconds: getUnixTime(values.date_borrowed) },
        date_return: { seconds: getUnixTime(values.date_return) },
        orderDetails: formatOrderDetails,
        total_amount: orderDetails.length,
      };

      if (data) {
        let statusOrder = IN_USE;
        let user_name = formatValues.user_name;
        if (cloneValues.status === CLOSED) {
          statusOrder = FREE;
          user_name = '';
        }
        db.collection('orders')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            formatOrderDetails.map((e) => {
              db.collection('assets')
                .doc(e.id)
                .update({ status: statusOrder, user_name: user_name })
                .then(() => {})
                .catch(() => {
                  setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                });
            });
            listIdNotSelect.map((id) => {
              db.collection('assets')
                .doc(id)
                .update({ status: FREE, user_name: '' })
                .then(() => {})
                .catch(() => {
                  setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                });
            });
            history.push(`/dashboard/delivery_reports`);
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

      db.collection('orders')
        .add({ ...formatValues })
        .then(() => {
          formatOrderDetails.map((e) => {
            db.collection('assets')
              .doc(e.id)
              .update({ status: IN_USE, user_name: formatValues?.user_name })
              .then(() => {})
              .catch(() => {
                setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
              });
          });
          history.push(`/dashboard/delivery_reports`);
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
    [data, history, listId, setAlert],
  );

  return [update];
};

export default useCreateAndUpdateOrder;
