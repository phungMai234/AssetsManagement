import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { filter } from 'lodash';

import Wrapper from './FormContainer.styles';
import DeliveryReportForm from '../DeliveryReportForm';
import { getUtcTime } from 'utils/helper';
import generateValidationSchema from './deliveryReport.validate';
import useCreateAndUpdateOrder from 'hooks/useCreateAndUpdateOrder';
import { BORROWING, IN_USE } from 'utils/constant';

const FormContainer = ({ data }) => {
  const listId = useMemo(() => {
    if (!data || !data?.orderDetails) {
      return [];
    }

    const arr = data.orderDetails.map((e) => {
      const listSeriListUnUses = filter(e.device_info.value.seri_list, (e) => e.status !== IN_USE);

      const listIdSelected = listSeriListUnUses.map((e) => e.id);
      const newList = listIdSelected.slice(data.orderDetails.length - 1);

      return newList;
    });

    return arr;
  }, [data]);

  const initialValues = useMemo(
    () => ({
      user_name: data?.user_name || '',
      date_borrowed: (!!data?.date_borrowed && getUtcTime(data.date_borrowed.seconds)) || new Date(),
      date_return: (!!data?.date_return && getUtcTime(data.date_return.seconds)) || '',
      status: data?.status || BORROWING,
      note: data?.note || '',
      orderDetails: (data?.orderDetails || [{ device_info: null, amount: '' }]).map((item, index) => ({
        ...item,
        index,
      })),
      files: data?.files || [],
    }),
    [data],
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
