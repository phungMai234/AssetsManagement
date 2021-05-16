import React, { useMemo } from 'react';
import { Formik } from 'formik';

import Wrapper from './FormContainer.styles';
import DeliveryReportForm from '../DeliveryReportForm';
import { getUtcTime } from 'utils/helper';
import generateValidationSchema from './deliveryReport.validate';
import useCreateAndUpdateOrder from 'hooks/useCreateAndUpdateOrder';
import { DRAFT } from 'utils/constant';

const FormContainer = ({ data }) => {
  const formatOrderDetail = useMemo(() => {
    if (!data || !data?.orderDetails) {
      return null;
    }
    return data.orderDetails.map((e) => ({
      device_info: { id: e.id, value: e.id, label: `${e.serial_number}_${e.name}` },
      status_order: e.status_order,
    }));
  }, [data]);

  const listId = useMemo(() => {
    if (!data || !data?.orderDetails) {
      return [];
    }
    return data.orderDetails.map((e) => e.id);
  }, [data]);

  const initialValues = useMemo(
    () => ({
      user_name: data?.user_name || '',
      date_borrowed: (!!data?.date_borrowed && getUtcTime(data.date_borrowed.seconds)) || new Date(),
      date_return: (!!data?.date_return && getUtcTime(data.date_return.seconds)) || '',
      status: data?.status || DRAFT,
      note: data?.note || '',
      orderDetails: (formatOrderDetail || [{ device_info: {}, status_order: '' }]).map((item, index) => ({
        ...item,
        index,
      })),
      files: data?.files || [],
    }),
    [data, formatOrderDetail],
  );

  const validationSchema = generateValidationSchema();

  const [update] = useCreateAndUpdateOrder({ data: data, listId: listId });

  return (
    <Wrapper>
      <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={update}>
        {(props) => <DeliveryReportForm isEdit={!!data} listId={listId} {...props} />}
      </Formik>
    </Wrapper>
  );
};
export default FormContainer;
