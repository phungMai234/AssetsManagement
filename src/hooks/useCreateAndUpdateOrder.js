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
      const cloneValues = { ...values };
      const { orderDetails } = cloneValues;

      const formatOrderDetails = orderDetails.map((e) => ({
        id: e.device_info.id,
        status_order: e.status_order,
      }));
      const listIdSelected = orderDetails.map((e) => e.device_info.id);
      const listIdNotSelect = difference(listId, listIdSelected);

      const formatValues = {
        ...cloneValues,
        date_borrowed: { seconds: getUnixTime(values.date_borrowed) },
        date_return: { seconds: getUnixTime(values.date_return) },
        orderDetails: formatOrderDetails,
        total_amount: orderDetails.length,
      };

      if (data) {
        let statusOrder = IN_USE;
        if (cloneValues.status === CLOSED) {
          statusOrder = FREE;
        }
        db.collection('orders')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            formatOrderDetails.map((e) => {
              db.collection('assets')
                .doc(e.id)
                .update({ status: statusOrder })
                .then(() => {})
                .catch(() => {
                  setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                });
            });
            listIdNotSelect.map((id) => {
              db.collection('assets')
                .doc(id)
                .update({ status: FREE })
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
              .update({ status: IN_USE })
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
