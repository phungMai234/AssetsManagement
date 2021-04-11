import React, { useState, useMemo } from 'react';

import { filter, includes, lowerCase } from 'lodash';
import { format } from 'date-fns';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Plus, FilePlus } from 'react-feather';

import Wrapper from './ItemList.style.js';
import TablePaginationData from 'components/TablePaginationData/TablePaginationData';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import { formatStringToMoney, formatDateToString } from 'utils/helper';
import { useQuery } from 'hooks/useQuery';
import DatePickerInput from 'components/DatePickerInput';

export default function Item() {
  const history = useHistory();

  const [params, setParams] = useState({});

  const { data: dataItems, loading: loadingItems } = useQuery({ url: 'devices' });
  const { data: dataCate, loading: loadingCates } = useQuery({ url: 'categories' });

  const recordItems = useMemo(() => {
    const newData = (dataItems || []).map((record) => ({
      ...record,
      import_date: formatDateToString(record?.import_date?.seconds),
    }));
    const filterParams = {
      id_category: params.id_category,
      import_date: params.import_date && format(params.import_date, 'dd/MM/yyyy'),
    };

    !params.import_date && delete filterParams.import_date;
    !params.id_category && delete filterParams.id_category;

    const customData = params.keyword
      ? filter(newData, (item) => includes(lowerCase(item.name), lowerCase(params.keyword)))
      : newData;

    return filter(customData, filterParams);
  }, [params.id_category, params.import_date, params.keyword, dataItems]);

  const restructureData = useMemo(() => {
    if (!recordItems) return [];
    return recordItems.map((record, index) => ({
      ...record,
      index: index + 1,
      import_date: record?.import_date,
      price_each: formatStringToMoney(record.price_each),
      onClick: () => history.push(`/dashboard/devices/${record.id}/detail`),
    }));
  }, [recordItems, history]);

  return (
    <Wrapper>
      <Row>
        <Col md={4} lg={3}>
          <BoxSearch value={params.keyword} onChange={(e) => setParams({ ...params, keyword: e.target.value })} />
        </Col>
        <Col md={4} lg={3}>
          <DatePickerInput
            value={params.import_date}
            onSelect={(date) => setParams({ ...params, import_date: date })}
          />
        </Col>
        <Col md={4} lg={3}>
          <Form.Control
            as="select"
            value={params.id_category || ''}
            onChange={(e) => setParams({ ...params, id_category: e.target.value })}
          >
            <option key="" value="">
              Chọn tất cả
            </option>

            {(dataCate || []).map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
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
            onClick={() => history.push('/dashboard/devices/new')}
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
            name: 'Tên',
            field: 'name',
          },
          {
            name: 'Ngày mua',
            field: 'import_date',
          },
          {
            name: 'Số lượng',
            field: 'amount',
          },
          {
            name: 'Tình trạng',
            field: 'status',
          },
          {
            name: 'Giá tiền (vnđ)',
            field: 'price_each',
          },
        ]}
        data={restructureData}
        loading={loadingItems || loadingCates}
      />
    </Wrapper>
  );
}
