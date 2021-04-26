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
import ModalImportFile from 'components/ModalImportFile';

export default function Item() {
  const history = useHistory();

  const [params, setParams] = useState({});
  const [openModalImport, setOpenModalImport] = useState(false);

  const { data: dataItems, loading: loadingItems } = useQuery({ url: 'devices' });
  const { data: dataCate, loading: loadingCates } = useQuery({ url: 'productlines' });

  const recordItems = useMemo(() => {
    const newData = (dataItems || []).map((record) => ({
      ...record,
      purchase_date: formatDateToString(record?.purchase_date?.seconds),
    }));
    const filterParams = {
      id_productline: params.id_productline,
      purchase_date: params.purchase_date && format(params.purchase_date, 'dd/MM/yyyy'),
    };

    !params.purchase_date && delete filterParams.purchase_date;
    !params.id_productline && delete filterParams.id_productline;

    const customData = params.keyword
      ? filter(newData, (item) => includes(lowerCase(item.name), lowerCase(params.keyword)))
      : newData;

    return filter(customData, filterParams);
  }, [params.id_productline, params.purchase_date, params.keyword, dataItems]);

  const restructureData = useMemo(() => {
    if (!recordItems) return [];
    return recordItems.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        picture: !!record?.image_detail && !!record?.image_detail.length && (
          <img src={record?.image_detail[0].preview} alt="image_detail" />
        ),
        purchase_date: record?.purchase_date,
        price_each: formatStringToMoney(record.price_each),
        onClick: () => history.push(`/dashboard/devices/${record.id}/detail`),
      };
    });
  }, [recordItems, history]);

  return (
    <Wrapper>
      <Row>
        <Col md={4} lg={3}>
          <BoxSearch value={params.keyword} onChange={(e) => setParams({ ...params, keyword: e.target.value })} />
        </Col>
        <Col md={4} lg={3}>
          <DatePickerInput
            value={params.purchase_date}
            onSelect={(date) => setParams({ ...params, purchase_date: date })}
          />
        </Col>
        <Col md={4} lg={3}>
          <Form.Control
            as="select"
            value={params.id_productline || ''}
            onChange={(e) => setParams({ ...params, id_productline: e.target.value })}
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
          <Button variant="success" size="sm" className="btn-import" onClick={() => setOpenModalImport(true)}>
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
            name: 'Ảnh minh họa',
            field: 'picture',
          },
          {
            name: 'Mã tài sản',
            field: 'code',
          },
          {
            name: 'Tên',
            field: 'name',
          },
          {
            name: 'Ngày mua',
            field: 'purchase_date',
          },
          {
            name: 'Số lượng',
            field: 'amount',
          },
          {
            name: 'Tình trạng',
            field: 'current_status',
          },
          {
            name: 'Đơn giá (vnđ)',
            field: 'price_each',
          },
        ]}
        data={restructureData}
        loading={loadingItems || loadingCates}
      />

      {openModalImport && <ModalImportFile onCancel={() => setOpenModalImport(false)} />}
    </Wrapper>
  );
}
