import React from 'react';
import LayoutPage from '../../components/LayoutPage';
import { ItemListPage } from '../Item';

const ItemPage = () => {
  return <LayoutPage children={<ItemListPage />} />;
};
export default ItemPage;
