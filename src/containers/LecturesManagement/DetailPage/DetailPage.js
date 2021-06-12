import React, { useState, useMemo, useCallback } from 'react';
import { isEmpty } from 'lodash';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Trash2, Edit, Printer, FileText, AlertTriangle } from 'react-feather';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useCustomQuery } from 'hooks/useCustomQuery';
import TablePaginationData from 'components/TablePaginationData';
import Wrapper from './DetailPage.styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DetailPage = () => {
  const { id } = useParams();
  let query = useQuery();
  const name = query.get('name');
  const history = useHistory();

  const { data: dataOrder, loading } = useCustomQuery({ name });

  const restructureData = useMemo(() => {
    if (!dataOrder || !dataOrder.length) return [];
    let arr = [];
    dataOrder.map((order) => {
      order.orderDetails.map((orderDetail) => {
        arr.push(orderDetail);
      });
    });
    arr = (arr || []).map((record) => ({
      ...record,
      model_number: record.device_info.value.model_number,
      name: record.device_info.value.name,
      amount: parseInt(record.amount),
    }));
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let index = newArr.findIndex((e) => e.model_number === arr[i].model_number);
      if (index >= 0) {
        newArr[index].amount += parseInt(arr[i].amount);
        // newArr[index].listSeri = newArr[index].listSeri.concat(arr[i].listSeri, '\n');
      } else {
        newArr.push(arr[i]);
      }
    }
    newArr = newArr.map((e, index) => {
      return {
        ...e,
        index: index + 1,
      };
    });
    return newArr;
  }, [dataOrder]);

  return (
    <Wrapper>
      <TablePaginationData
        columns={[
          {
            name: 'STT',
            field: 'index',
          },
          {
            name: 'Model',
            field: 'model_number',
          },
          {
            name: 'Tên',
            field: 'name',
          },
          {
            name: 'Số lượng',
            field: 'amount',
          },
          // {
          //   name: 'List Seri',
          //   field: 'listSeri',
          // },
        ]}
        data={restructureData}
        loading={loading}
      />
    </Wrapper>
  );
};

export default DetailPage;
