import React from 'react';

import FormContainer from '../FormContainer';
import { useParams } from 'react-router-dom';
import useGetDetail from 'hooks/useGetDetail';
import { useGetDetailProductLine } from 'hooks/useGetDetailProductLine';
import Loading from 'components/Loading';

const EditPage = () => {
  const { id } = useParams();

  const { data, loading } = useGetDetail({ nameCollection: 'categories', id: id });
  const { dataProduct, loading: loadingProductLine } = useGetDetailProductLine({ id: id });

  if (loading || loadingProductLine) {
    return <Loading />;
  }
  return <FormContainer data={{ ...data, orderDetails: dataProduct, id: id }} />;
};

export default EditPage;
