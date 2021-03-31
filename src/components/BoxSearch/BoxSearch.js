import React from 'react';

import Wrapper from './BoxSearch.style';
import { Search } from 'react-feather';

const BoxSearch = ({ value, onChange, props }) => {
  return (
    <Wrapper {...props}>
      <div className="icon-search">
        <Search size={20} />
      </div>

      <input className="input-search" placeholder="Tìm kiếm" value={value} onChange={onChange} />
    </Wrapper>
  );
};
export default BoxSearch;
