import React, { useState, useMemo } from 'react';

import { filter, includes, lowerCase } from 'lodash';
import { format } from 'date-fns';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Plus, FilePlus, FileText } from 'react-feather';

import Wrapper from './ListPage.styles';
import TablePaginationData from 'components/TablePaginationData/TablePaginationData';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import { formatDateToString } from 'utils/helper';
import { useQuery } from 'hooks/useQuery';
import DatePickerInput from 'components/DatePickerInput';
import StatusBorrow from 'components/StatusBorrow';
import { LIST_STATUS } from 'utils/constant';

const ListPage = () => {
  const history = useHistory();

  const [params, setParams] = useState({});

  const { data: dataItems, loading: loadingItems } = useQuery({ url: 'orders' });

  const recordItems = useMemo(() => {
    const newData = (dataItems || []).map((record) => ({
      ...record,
      date_borrowed: formatDateToString(record?.date_borrowed?.seconds),
      date_return: formatDateToString(record?.date_return?.seconds),
    }));

    const filterParams = {
      status: params.status,
      date_borrowed: params.date_borrowed && format(params.date_borrowed, 'dd/MM/yyyy'),
    };

    !params.status && delete filterParams.status;
    !params.date_borrowed && delete filterParams.date_borrowed;

    const customData = params.keyword
      ? filter(newData, (item) => includes(lowerCase(item.user_name), lowerCase(params.keyword)))
      : newData;

    return filter(customData, filterParams);
  }, [dataItems, params.date_borrowed, params.keyword, params.status]);

  const restructureData = useMemo(() => {
    if (!recordItems) return [];
    return recordItems.map((record, index) => ({
      ...record,
      index: index + 1,
      status: <StatusBorrow status={record?.status} />,
      report_file: record?.report_file ? <FileText className="file-text" /> : '-',
      onClick: () => history.push(`/dashboard/delivery_reports/${record.id}/detail`),
    }));
  }, [recordItems, history]);

  return (
    <Wrapper>
      <Row>
        <Col md={3}>
          <BoxSearch value={params.keyword} onChange={(e) => setParams({ ...params, keyword: e.target.value })} />
        </Col>
        <Col md={3}>
          <DatePickerInput
            value={params.date_borrowed}
            onSelect={(date) => setParams({ ...params, date_borrowed: date })}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            size="sm"
            value={params.status || ''}
            onChange={(e) => setParams({ ...params, status: e.target.value })}
          >
            <option key="" value="">
              Chọn tất cả
            </option>

            {(LIST_STATUS || []).map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="row-button">
          <Button
            variant="primary"
            size="sm"
            className="btn-add"
            onClick={() => history.push('/dashboard/delivery_reports/new')}
          >
            <Plus size={20} />
            <span>Thêm mới</span>
          </Button>
          <Button variant="success" size="sm" className="btn-import">
            <FilePlus size={20} />
            <span>Nhập file</span>
          </Button>
        </Col>
      </Row>

      <TablePaginationData
        columns={[
          {
            name: 'STT',
            field: 'index',
          },
          {
            name: 'Tên người mượn',
            field: 'user_name',
          },
          {
            name: 'Trạng thái',
            field: 'status',
          },
          {
            name: 'Ngày mượn',
            field: 'date_borrowed',
          },
          {
            name: 'Ngày trả',
            field: 'date_return',
          },
          {
            name: 'Tổng số lượng',
            field: 'total_amount',
          },
          {
            name: 'Đính kèm file',
            field: 'report_file',
          },
        ]}
        data={restructureData}
        loading={loadingItems}
      />
    </Wrapper>
  );
};

export default ListPage;
