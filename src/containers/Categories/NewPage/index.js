import React, { useCallback } from 'react';
import ModalAddCategory from '../ModalAddCategory';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAlert from 'hooks/useAlert';

import db from 'database';

const NewPage = ({ onCancel }) => {
  const { setAlert } = useAlert();

  const initialValues = {
    name: '',
    manager: '',
    note: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Trường bắt buộc').max(255, 'Không quá 255 kí tự'),
    manager: Yup.string().trim().required('Trường bắt buộc').max(255, 'Không quá 255 kí tự'),
    note: Yup.string().trim().max(2000, 'Không quá 2000 kí tự'),
  });

  const handleSubmit = useCallback(
    (values) => {
      db.collection('categories')
        .add({ ...values })
        .then(() => {
          setAlert({ status: 'success', message: 'Tạo mới thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        });
    },
    [setAlert],
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(props) => <ModalAddCategory onHide={onCancel} {...props} />}
    </Formik>
  );
};

export default NewPage;
