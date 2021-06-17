import React, { useContext, useMemo } from 'react';

import FormContainer from '../FormContainer';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { DeliveryReportContext } from 'contexts/DeliveryReportContext';

const EditPage = () => {
  const { id } = useParams();

  const { data, loading } = useContext(DeliveryReportContext);

  const restructureData = useMemo(() => {
    if (loading) {
      return {};
    }

    let order = data.find((e) => e.id === id);

    return order;
  }, [data, id, loading]);

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <FormContainer
      data={{
        ...restructureData,
        user_name: { name: restructureData?.user_name, label: restructureData?.user_name },
        orderDetails: restructureData?.order_details,
      }}
    />
  );
};

export default EditPage;
