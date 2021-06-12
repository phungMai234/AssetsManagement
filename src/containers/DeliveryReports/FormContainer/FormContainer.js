import React, { useMemo, useCallback } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import Wrapper from './FormContainer.styles';
import DeliveryReportForm from '../DeliveryReportForm';
import { db } from 'database';
import { getUtcTime, getUnixTime } from 'utils/helper';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';
import generateValidationSchema from './deliveryReport.validate';

const FormContainer = ({ data }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const initialValues = useMemo(
    () => ({
      user_name: data?.user_name || '',
      date_borrowed: (!!data?.date_borrowed && getUtcTime(data.date_borrowed.seconds)) || new Date(),
      date_return: (!!data?.date_return && getUtcTime(data.date_return.seconds)) || '',
      status: data?.status || 'pending',
      note: data?.note || '',
      orderDetails: (data?.orderDetails || [{ id_device: '', quantity_ordered: 0 }]).map((item, index) => ({
        ...item,
        index,
      })),
      files: data?.files || [],
    }),
    [data],
  );

  const validationSchema = generateValidationSchema();

  const handleSubmit = useCallback(
    (values) => {
      const cloneValues = { ...values };
      const { orderDetails } = cloneValues;
      let countDevices = 0;
      orderDetails.map((e) => {
        countDevices = countDevices + Number(e.quantity_ordered);
      });

      const formatValues = {
        ...cloneValues,
        date_borrowed: { seconds: getUnixTime(values.date_borrowed) },
        date_return: { seconds: getUnixTime(values.date_return) },
        total_amount: countDevices,
      };

      delete formatValues.orderDetails;

      if (data) {
        db.collection('orders')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            orderDetails.map((e) => {
              delete e.index;
              if (e?.id) {
                db.collection('orderDetails')
                  .doc(e.id)
                  .update({ ...e })
                  .then(() => {})
                  .catch(() => {
                    setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                  });
              } else {
                db.collection('orderDetails')
                  .add({ ...e, id_order: data?.id })
                  .then(() => {})
                  .catch(() => {
                    setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                  });
              }
              focusOnTop();
            });
            history.push(`/dashboard/delivery_reports`);
            setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
          })
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          });
        focusOnTop();
        return;
      }

      db.collection('orders')
        .add({ ...formatValues })
        .then((docRef) => {
          let id_order = docRef.id;

          orderDetails.map((e) => {
            db.collection('orderDetails')
              .add({ ...e, id_order: id_order })
              .then(() => {})
              .catch(() => {
                setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
              });
            focusOnTop();
          });

          history.push(`/dashboard/delivery_reports`);
          setAlert({ status: 'success', message: 'Tạo mới thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        });
    },
    [data, history, setAlert],
  );

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => <DeliveryReportForm isEdit={!!data} {...props} />}
      </Formik>
    </Wrapper>
  );
};
export default FormContainer;
