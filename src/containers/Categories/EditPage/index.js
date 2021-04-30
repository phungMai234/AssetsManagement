import React, { useCallback } from 'react';
import ModalAddCategory from '../ModalAddCategory';
import * as Yup from 'yup';
import { Formik } from 'formik';
import db from 'database';
import useAlert from 'hooks/useAlert';

const EditPage = ({ onCancel, record }) => {
  const { setAlert } = useAlert();

  const initialValues = {
    name: record?.name || '',
    manager: record?.manager || '',
    note: record?.note || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Trường bắt buộc').max(255, 'Không quá 255 kí tự'),
    manager: Yup.string().trim().required('Trường bắt buộc').max(255, 'Không quá 255 kí tự'),
    note: Yup.string().trim().max(2000, 'Không quá 2000 kí tự'),
  });

  const handleSubmit = useCallback(
    (values) => {
      db.collection('categories')
        .doc(record?.id)
        .update({ ...values })
        .then(() => {
          onCancel();
          setAlert({ status: 'success', message: 'Cập nhật chỉnh sửa thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        });
    },
    [onCancel, record, setAlert],
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(props) => <ModalAddCategory isEdit onHide={onCancel} {...props} />}
    </Formik>
  );
};

export default EditPage;
