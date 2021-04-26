import React from 'react';

import FormContainer from '../FormContainer';
import { useParams } from 'react-router-dom';
import useGetDetail from 'hooks/useGetDetail';
import Loading from 'components/Loading';
import { useGetDetailReport } from 'hooks/useGetDetailReport';

const EditPage = () => {
  const { id } = useParams();

  const { data, loading } = useGetDetail({ nameCollection: 'orders', id: id });
  const { dataOrderDetail, loading: loadingOrderDetail } = useGetDetailReport({ id: id });

  if (loading || loadingOrderDetail) {
    return <Loading />;
  }
  return <FormContainer data={{ ...data, orderDetails: dataOrderDetail, id: id }} />;
};

export default EditPage;
