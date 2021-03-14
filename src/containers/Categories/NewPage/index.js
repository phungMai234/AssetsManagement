import React, { useCallback } from 'react';
import ModalAddCategory from '../ModalAddCategory';
import * as Yup from 'yup';
import { Formik } from 'formik';
import db from '../../../database';

const NewPage = ({ onCancel }) => {
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

  const handleSubmit = useCallback((values) => {
    db.collection('categories')
      .add({ ...values })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }, []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(props) => <ModalAddCategory onHide={onCancel} {...props} />}
    </Formik>
  );
};

export default NewPage;
