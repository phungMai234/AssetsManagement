import React, { useState, useMemo, useCallback } from 'react';

import { filter, includes, lowerCase } from 'lodash';
import { format } from 'date-fns';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Plus, FilePlus, Download } from 'react-feather';

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
  const { data: dataCate, loading: loadingCates } = useQuery({ url: 'categories' });

  const recordItems = useMemo(() => {
    const newData = (dataItems || []).map((record) => ({
      ...record,
      purchase_date: formatDateToString(record?.purchase_date?.seconds),
    }));
    const filterParams = {
      id_category: params.id_category,
      purchase_date: params.purchase_date && format(params.purchase_date, 'dd/MM/yyyy'),
    };

    !params.purchase_date && delete filterParams.purchase_date;
    !params.id_category && delete filterParams.id_category;

    const customData = params.keyword
      ? filter(newData, (item) => includes(lowerCase(item.serial_number), lowerCase(params.keyword)))
      : newData;

    return filter(customData, filterParams);
  }, [params.id_category, params.purchase_date, params.keyword, dataItems]);

  const restructureData = useMemo(() => {
    if (!recordItems) return [];
    return recordItems.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        picture:
          !!record?.image_detail && !!record?.image_detail.length ? (
            <img src={record?.image_detail[0].preview} alt="image_detail" />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Fno-image.png?alt=media&token=e885dc29-ba97-45c8-8f0f-acad14a7b946"
              alt="no-image"
            />
          ),
        purchase_date: record?.purchase_date,
        price_each: formatStringToMoney(record.price_each),
        onClick: () => history.push(`/dashboard/devices/${record.id}/detail`),
      };
    });
  }, [recordItems, history]);

  // const DownloadExcel = useCallback(() => {
  //   const file = new File('hello', 'hello world.txt', { type: 'text/plain;charset=utf-8' });
  //   FileSaver.saveAs(file);
  // }, [restructureData]);

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
            variant="success"
            size="sm"
            className="btn-add"
            onClick={() => history.push('/dashboard/devices/new')}
          >
            <Plus size={20} />
            <span>Thêm mới</span>
          </Button>
          <Button variant="warning" size="sm" className="btn-import" onClick={() => setOpenModalImport(true)}>
            <FilePlus size={20} />
            <span>Nhập file</span>
          </Button>
          <Button variant="info" size="sm" className="btn-add">
            <Download size={20} />
            <span>Tải Danh sách</span>
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
            name: 'Số kiểu (P/N)',
            field: 'model_number',
          },
          {
            name: 'Số seri (S/N)',
            field: 'serial_number',
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
