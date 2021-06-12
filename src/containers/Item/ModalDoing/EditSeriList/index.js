import React, { useMemo } from 'react';
import { Formik } from 'formik';

import ModalListSeri from '../ModalListSeri';
import useCreateAndUpdateOrder from 'hooks/useCreateAndUpdateOrder';

const FormContainer = ({ data, onCancel }) => {
  const initialValues = useMemo(
    () => ({
      seri_list: (data || [{ serial_number: {}, status_order: '', status: '' }]).map((item, index) => ({
        ...item,
        index,
      })),
    }),
    [data],
  );

  // const validationSchema = generateValidationSchema();

  const [update] = useCreateAndUpdateOrder({ data: data });

  return (
    <>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={update}>
        {(props) => <ModalListSeri onHide={onCancel} {...props} />}
      </Formik>
    </>
  );
};
export default FormContainer;
