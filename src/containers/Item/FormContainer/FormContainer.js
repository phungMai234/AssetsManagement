import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Wrapper from './FormContainer.style';
import ItemEdit from '../ItemEdit';
import { getUtcTime } from 'utils/helper';
import useCreateAndUpdateAsset from 'hooks/useCreateAndUpdateAsset';
import { FREE } from 'utils/constant';

const FormContainer = ({ data }) => {
  const initialValues = useMemo(
    () => ({
      name: data?.name || '',
      purchase_date: (!!data?.purchase_date && getUtcTime(data.purchase_date.seconds)) || new Date(),
      id_category: data?.id_category || '',
      status: data?.status || FREE,
      current_status: data?.current_status || '',
      description: data?.description || '',
      price_each: data?.price_each || '',
      unit: data?.unit || '',
      image_detail: data?.image_detail || [],
      serial_number: data?.serial_number || '',
      model_number: data?.model_number || '',
    }),
    [data],
  );

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
    description: Yup.string().trim().max(2000, 'Nhập không quá 2000 kí tự'),
    purchase_date: Yup.string().trim().required('Đây là trường bắt buộc '),
    id_category: Yup.string().trim().required('Đây là trường bắt buộc '),
    price_each: Yup.number().required('Đây là trường bắt buộc '),
    serial_number: Yup.string().trim().required('Đây là trường bắt buộc').max(255, 'Nhập không quá 255 kí tự'),
    model_number: Yup.string().trim().max(255, 'Nhập không quá 255 kí tự'),
  });

  const [update] = useCreateAndUpdateAsset({ data: data });

  return (
    <Wrapper>
      <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={update}>
        {(props) => <ItemEdit isEdit={!!data} {...props} />}
      </Formik>
    </Wrapper>
  );
};
export default FormContainer;
