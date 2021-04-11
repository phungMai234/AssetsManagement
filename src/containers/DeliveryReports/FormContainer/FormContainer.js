import React, { useMemo, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Wrapper from './FormContainer.styles';
import DeliveryReportForm from '../DeliveryReportForm';
import { db } from 'database';
import { getUtcTime, getUnixTime } from 'utils/helper';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

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

  const validationSchema = Yup.object().shape(
    {
      user_name: Yup.string().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
      status: Yup.string().required('Đây là trường bắt buộc '),
      date_borrowed: Yup.string().required('Đây là trường bắt buộc '),
      date_return: Yup.string(),
      note: Yup.string().max(2000, 'Nhập không quá 2000 kí tự'),
      orderDetails: Yup.array().of(
        Yup.object().shape({
          id_device: Yup.string().required('Đây là trường bắt buộc '),
          quantity_ordered: Yup.number()
            .required('Đây là trường bắt buộc ')
            .test('test value', 'Số lượng phải lớn hơn 0', function (quantity_ordered) {
              return quantity_ordered > 0;
            }),
        }),
      ),
      files: Yup.array().when('status', {
        is: (status) => ['borrowing', 'closed'].includes(status),
        then: Yup.array()
          .test('test upload files', 'Đây là trường bắt buộc ', function (files) {
            return files.length > 0;
          })
          .test('test upload files', 'Vui lòng tải lên 2 tệp cho trạng thái đã đóng ', function (files) {
            const { status } = this.parent;
            if (status === 'closed') return files.length === 2;
            return true;
          }),
      }),
    },
    ['status', 'files'],
  );

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

      console.log('formatValues: ', formatValues);

      // if (data) {
      //   db.collection('devices')
      //     .doc(data?.id)
      //     .update({ ...formatValues })
      //     .then(() => {
      //       history.push(`/dashboard/devices`);
      //       setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
      //     })
      //     .catch(() => {
      //       setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
      //     });
      //   focusOnTop();
      //   return;
      // }
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
    [history, setAlert],
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
