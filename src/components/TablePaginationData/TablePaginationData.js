import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';

import Wrapper from './TablePaginationData.style';
import Loading from 'components/Loading';
import { Table } from 'react-bootstrap';

const TablePaginationData = ({ columns, data, loading }) => {
  const [currentPage, changeCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = data.length;

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentItemsShow = data.slice(indexOfFirstNews, indexOfLastNews);
  const [dataShow, setDataShow] = useState(currentItemsShow);

  const handleChangeItemsPerPage = (e) => {
    const number = e.target.value;
    setItemsPerPage(number);
  };
  const handlePageChange = (pageNumber) => {
    changeCurrentPage(pageNumber);
  };

  useEffect(() => {
    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentItemsShow = data.slice(indexOfFirstNews, indexOfLastNews);
    setDataShow(currentItemsShow);
  }, [currentPage, data, itemsPerPage]);

  return (
    <Wrapper>
      <div className="wrapper-select">
        <label htmlFor="option">Đang hiển thị: </label>

        <select id="option" value={itemsPerPage} onChange={handleChangeItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        <Table hover bordered>
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
            {loading && (
              <tr>
                <td className="no-result" colSpan={columns.length}>
                  <Loading />
                </td>
              </tr>
            )}
            {!loading &&
              dataShow.map((row, index) => (
                <tr key={index} onClick={row.onClick}>
                  {columns.map(({ field }, index) => (
                    <td key={index} className={'td-' + field}>
                      {row[field]}
                    </td>
                  ))}
                </tr>
              ))}
            {!loading && !data.length && (
              <tr>
                <td className="no-result" colSpan={columns.length}>
                  Không có kết quả để hiển thị
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
