import React, { useMemo, useCallback } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import Wrapper from './FormContainer.style';
import CateGoryForm from './CategoryForm';
import { db } from 'database';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';
import generateValidationSchema from './categories.validate';

const FormContainer = ({ data }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const initialValues = useMemo(
    () => ({
      name: data?.name || '',
      note: data?.note || '',
      orderDetails: (data?.orderDetails || [{ product_line_code: '', name: '', text_description: '' }]).map(
        (item, index) => ({
          ...item,
          index,
        }),
      ),
      manager: data?.manager || '',
    }),
    [data],
  );

  const validationSchema = generateValidationSchema();

  const handleSubmit = useCallback(
    (values) => {
      const cloneValues = { ...values };
      const { orderDetails } = cloneValues;

      delete cloneValues.orderDetails;

      if (data) {
        db.collection('categories')
          .doc(data?.id)
          .update({ ...cloneValues })
          .then(() => {
            orderDetails.map((e) => {
              delete e.index;
              if (e?.id) {
                db.collection('productlines')
                  .doc(e.id)
                  .update({ ...e })
                  .then(() => {})
                  .catch(() => {
                    setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                  });
              } else {
                db.collection('productlines')
                  .add({ ...e, id_category: data?.id })
                  .then(() => {})
                  .catch(() => {
                    setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
                  });
              }
              focusOnTop();
            });
            history.push(`/dashboard/categories`);
            setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
          })
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          });
        focusOnTop();
        return;
      }

      db.collection('categories')
        .add({ ...cloneValues })
        .then((docRef) => {
          let id_category = docRef.id;

          orderDetails.map((e) => {
            db.collection('productlines')
              .add({ ...e, id_category: id_category })
              .then(() => {})
              .catch(() => {
                setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
              });
            focusOnTop();
          });

          history.push(`/dashboard/categories`);
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
        {(props) => <CateGoryForm isEdit={!!data} {...props} />}
      </Formik>
    </Wrapper>
  );
};
export default FormContainer;
