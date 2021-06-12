import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from 'database';
import useAlert from 'hooks/useAlert';
import { getUnixTime } from 'utils/helper';
import focusOnTop from 'utils/focusOnTop';
import { difference, filter } from 'lodash';
import { FREE, IN_USE } from 'utils/constant';

const useCreateAndUpdateOrder = ({ data, listId }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const update = useCallback(
    (values, actions) => {
      const cloneValues = { ...values };
      const { orderDetails } = cloneValues;

      const arr = orderDetails.map((e) => {
        const listSeriListUnUses = filter(e.device_info.value.seri_list, (e) => e.status !== IN_USE);

        const listIdSelected = listSeriListUnUses.map((e) => e.id);
        const newList = listIdSelected.splice(0, Number(e.amount));

        return newList;
      });
      const arr2 = orderDetails.map((e) => {
        const listSeriListUnUses = filter(e.device_info.value.seri_list, (e) => e.status !== IN_USE);

        const listIdSelected = listSeriListUnUses.map((e) => e.serial_number);
        const newList = listIdSelected.splice(0, Number(e.amount));

        return newList;
      });

      const newSeri = orderDetails.map((e, index) => {
        return { ...e, listSeri: arr2[index] };
      });

      const listIdNotSelect = difference(listId.flat(), arr.flat());

      const formatValues = {
        ...cloneValues,
        user_name: values.user_name,
        date_borrowed: { seconds: getUnixTime(values.date_borrowed) },
        date_return: { seconds: getUnixTime(values.date_return) },
        orderDetails: newSeri,
        total_amount: arr.flat().length,
        list_id: arr.flat(),
      };

      if (data) {
        db.collection('orders')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            arr.flat().map((id) => {
              db.collection('assets')
                .doc(id)
                .update({ status: IN_USE })
                .then(() => {})
                .catch(() => {
                  setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                });
            });
            !!listIdNotSelect?.length &&
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
          arr.flat().map((id) => {
            db.collection('assets')
              .doc(id)
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
