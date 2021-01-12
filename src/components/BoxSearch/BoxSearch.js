import React from 'react';

import Wrapper from './BoxSearch.style';

const BoxSearch = () => {
  return (
    <Wrapper>
      <div className="icon-search">
        <i class="fas fa-search"></i>
      </div>

      <input className="input-search" placeholder="Tìm kiếm" />
    </Wrapper>
  );
};
export default BoxSearch;
