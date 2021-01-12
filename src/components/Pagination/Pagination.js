import React from 'react';
import Pagination from 'react-js-pagination';

import Wrapper from './Pagination.style';

const PaginationA = ({ currentPage, totalItems, itemsPerPage, onChange }) => {
  return (
    <Wrapper>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={3}
        onChange={onChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </Wrapper>
  );
};
export default Pagination;
