import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';

import Wrapper from './TablePaginationData.style';

const TablePaginationData = ({ columns, data }) => {
  const [currentPage, changeCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = data.length;

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentItemsShow = data.slice(indexOfFirstNews, indexOfLastNews);
  const [dataShow, setDataShow] = useState(currentItemsShow);

  const handleChangeItemsPerPage = e => {
    const number = e.target.value;
    setItemsPerPage(number);
  };
  const handlePageChange = pageNumber => {
    changeCurrentPage(pageNumber);
  };

  useEffect(() => {
    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentItemsShow = data.slice(indexOfFirstNews, indexOfLastNews);
    setDataShow(currentItemsShow);
  }, [currentPage, itemsPerPage, data]);

  return (
    <Wrapper>
      <div className="wrapper-select">
        <label htmlFor="option">Đang hiển thị: </label>

        <select id="option" onChange={handleChangeItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="wrapper-table">
        <table className="table table-borderless">
          <thead>
            <tr>
              {columns.map(({ name, field }, index) => (
                <th key={index} className={field}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataShow.map((row, index) => (
              <tr key={index} onClick={row.onClick}>
                {columns.map(({ field }, index) => (
                  <td key={index} className={'td-' + field}>
                    {row[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="wrapper-option">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </Wrapper>
  );
};
export default TablePaginationData;
