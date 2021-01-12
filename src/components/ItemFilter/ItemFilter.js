import React from 'react';

import Wrapper from './ItemFilter.style';
import DatePickerInput from '../../components/DatePickerInput';
import dataCategories from '../../config/dataCategories';
import { Button } from 'react-bootstrap';
import BoxSearch from '../BoxSearch/BoxSearch';
import BoxSelect from '../BoxSelect/BoxSelect';

const ItemFilter = () => {
  return (
    <Wrapper>
      <div className="row ">
        <div className="col-lg-6">
          <BoxSearch />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <BoxSelect />
        </div>
        <div className="col-lg-6">
          <DatePickerInput />
        </div>
      </div>
    </Wrapper>
  );
};
export default ItemFilter;
