import React from 'react';

import FormContainer from '../FormContainer';
import { useParams } from 'react-router-dom';
import useGetDetail from 'hooks/useGetDetail';
import Loading from 'components/Loading';

const EditPage = () => {
  const { id } = useParams();

  const { data, loading } = useGetDetail({ nameCollection: 'devices', id: id });

  if (loading) {
    return <Loading />;
  }
  return <FormContainer data={{ ...data, id: id }} />;
};

export default EditPage;
