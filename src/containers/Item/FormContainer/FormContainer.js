import React, { useMemo, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Wrapper from './FormContainer.style';
import ItemEdit from '../ItemEdit';
import db from '../../../database';
import { getUtcTime, getUnixTime } from 'utils/helper';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const FormContainer = ({ data }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const initialValues = useMemo(
    () => ({
      name: data?.name || '',
      import_date: (!!data?.import_date && getUtcTime(data.import_date.seconds)) || new Date(),
      id_category: data?.id_category || '',
      amount: data?.amount || '',
      status: data?.status || '',
      description: data?.description || '',
      price_each: data?.price_each || '',
      unit: data?.unit || '',
      image_detail: data?.image_detail || [],
    }),
    [data],
  );

  const validationSchema = Yup.object({
    name: Yup.string().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
    description: Yup.string().max(2000, 'Nhập không quá 2000 kí tự'),
    import_date: Yup.string().required('Đây là trường bắt buộc '),
    id_category: Yup.string().required('Đây là trường bắt buộc '),
    price_each: Yup.number().required('Đây là trường bắt buộc '),
    amount: Yup.number().required('Đây là trường bắt buộc'),
  });

  const handleSubmit = useCallback(
    (values) => {
      const cloneValues = { ...values };

      const formatValues = { ...cloneValues, import_date: { seconds: getUnixTime(values.import_date) } };

      if (data) {
        db.collection('devices')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            history.push(`/dashboard/devices`);
            setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
          })
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          });
        focusOnTop();
        return;
      }
      db.collection('devices')
        .add({ ...formatValues })
        .then(() => {
          history.push(`/dashboard/devices`);
          setAlert({ status: 'success', message: 'Tạo mới thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        });
      focusOnTop();
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
        {(props) => <ItemEdit isEdit={!!data} {...props} />}
      </Formik>
    </Wrapper>
  );
};
export default FormContainer;
