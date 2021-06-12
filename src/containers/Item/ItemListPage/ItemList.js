import React, { useState, useMemo, useCallback } from 'react';

import { filter, includes, lowerCase, groupBy } from 'lodash';
import { format } from 'date-fns';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Plus, FilePlus, Download } from 'react-feather';

import Wrapper from './ItemList.style.js';
import TablePaginationData from 'components/TablePaginationData/TablePaginationData';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import { formatStringToMoney, formatDateToString, getNameCategory, formatDateToString2 } from 'utils/helper';
import { useQuery } from 'hooks/useQuery';
import { useQueryAssets } from 'hooks/useQueryAssets';
import DatePickerInput from 'components/DatePickerInput';
import ModalImportFile from 'components/ModalImportFile';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { IN_USE } from 'utils/constant';
import ModalDetailSeri from '../ModalDetailSeri';
import ModalAddSeri from '../ModalAddSeri';

export default function Item() {
  const history = useHistory();

  const [params, setParams] = useState({});
  const [openModalImport, setOpenModalImport] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(null);
  const [showModalAddSeri, setModalAddSeri] = useState(null);
  const [exporter, setExporter] = useState();

  const { data: dataItems, loading: loadingItems, force } = useQueryAssets({});
  const { data: dataCate, loading: loadingCates } = useQuery({ url: 'categories' });

  const dataFormatItems = useMemo(() => {
    const dataGroupByModelNumber = groupBy(dataItems, 'model_number');
    const listModel = Object.keys(dataGroupByModelNumber);
    const result = listModel.map((model) => {
      const listItemByModel = dataGroupByModelNumber[model];
      let newObject = { ...listItemByModel[0] };
      let newSeri = [];
      let countStatusInUsed = 0;
      let countStatusBroken = 0;

      listItemByModel.map((e) => {
        newSeri.push({
          id: e.id,
          serial_number: e.serial_number,
          status: e.status,
          current_status: e.current_status,
          purchase_date: formatDateToString(e?.purchase_date?.seconds),
          price_each: e.price_each,
        });
        e.status === IN_USE && countStatusInUsed++;
        e.current_status === 'Hỏng' && e.countStatusBroken++;
      });
      delete newObject.id;
      delete newObject.serial_number;
      delete newObject.status;

      newObject.total = listItemByModel.length;
      newObject.seri_list = newSeri;
      newObject.count_inused = countStatusInUsed;
      newObject.count_broken = countStatusBroken;

      return newObject;
    });
    return result;
  }, [dataItems]);

  const recordItems = useMemo(() => {
    const newData = (dataFormatItems || []).map((record) => ({
      ...record,
      purchase_date: formatDateToString(record?.purchase_date?.seconds),
    }));
    const filterParams = {
      id_category: params.id_category,
      purchase_date: params.purchase_date && format(params.purchase_date, 'dd/MM/yyyy'),
      status: params?.status,
    };

    !params.purchase_date && delete filterParams.purchase_date;
    !params.id_category && delete filterParams.id_category;
    !params.status && delete filterParams.status;

    const customData = params.keyword
      ? filter(newData, (item) => includes(lowerCase(item.name), lowerCase(params.keyword)))
      : newData;

    return filter(customData, filterParams);
  }, [dataFormatItems, params]);

  const dataFormatExportExcel = useMemo(() => {
    if (!dataItems || !dataItems.length) return [];
    return dataItems.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        amount: 1,
        nameCate: getNameCategory(dataCate, record.id_category),
        picture:
          !!record?.image_detail && !!record?.image_detail.length ? (
            <img src={record?.image_detail[0].preview} alt="image_detail" />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Fno-image.png?alt=media&token=e885dc29-ba97-45c8-8f0f-acad14a7b946"
              alt="no-image"
            />
          ),
        purchase_date: formatDateToString2(record?.purchase_date?.seconds),
        price_each: formatStringToMoney(record.price_each),
        price_each_print: record.price_each,
        rest: record.total - record.count_inused - record.count_broken,
      };
    });
  }, [dataCate, dataItems]);

  const restructureData = useMemo(() => {
    if (!recordItems || !recordItems.length) return [];
    return recordItems.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        nameCate: getNameCategory(dataCate, record.id_category),
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
        price_each_print: record.price_each,
        rest: record.total - record.count_inused - record.count_broken,
        group_button_action: (
          <div>
            <Button size="sm" variant="info" className="button-action" onClick={() => setOpenModalDetail(record)}>
              Chi tiết
            </Button>
            <Button size="sm" variant="success" className="button-action" onClick={() => setModalAddSeri(record)}>
              Thêm mới
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="button-action"
              onClick={() => history.push(`/dashboard/assets/${record?.seri_list[0].id}/edit`)}
            >
              Chỉnh sửa
            </Button>
          </div>
        ),
      };
    });
  }, [recordItems, dataCate, history]);

  return (
    <Wrapper>
      <Row>
        <Col md={4} lg={3}>
          <BoxSearch
            placeholderText="Tìm kiếm"
            value={params.keyword}
            onChange={(e) => setParams({ ...params, keyword: e.target.value })}
          />
        </Col>
        <Col md={4} lg={3}>
          <DatePickerInput
            placeholderText="Ngày mua"
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
              Loại tài sản
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
          <Button variant="success" size="sm" className="btn-add" onClick={() => history.push('/dashboard/assets/new')}>
            <Plus size={20} />
            <span>Thêm mới</span>
          </Button>
          <Button variant="warning" size="sm" className="btn-import" onClick={() => setOpenModalImport(true)}>
            <FilePlus size={20} />
            <span>Nhập file</span>
          </Button>
          <Button variant="info" size="sm" className="btn-add" onClick={() => exporter.save()}>
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
            name: 'Model',
            field: 'model_number',
          },
          {
            name: 'Tên',
            field: 'name',
          },
          {
            name: 'Tổng số lượng',
            field: 'total',
          },
          {
            name: 'Đang cho mượn',
            field: 'count_inused',
          },
          {
            name: 'Hỏng',
            field: 'count_broken',
          },
          {
            name: 'Còn',
            field: 'rest',
          },
          {
            name: '',
            field: 'group_button_action',
          },
        ]}
        data={restructureData}
        loading={loadingItems || loadingCates}
      />
      {openModalDetail && (
        <ModalDetailSeri data={openModalDetail} force={force} onCancel={() => setOpenModalDetail(null)} />
      )}
      {showModalAddSeri && (
        <ModalAddSeri data={showModalAddSeri} force={force} onCancel={() => setModalAddSeri(null)} />
      )}
      {openModalImport && <ModalImportFile onCancel={() => setOpenModalImport(false)} />}
      <ExcelExport
        data={dataFormatExportExcel}
        fileName="Danh_sach_tai_san.xlsx"
        ref={(exporter) => {
          setExporter(exporter);
        }}
      >
        <ExcelExportColumn field="index" title="STT" />
        <ExcelExportColumn field="serial_number" title="Số seri (S/N)" />
        <ExcelExportColumn field="name" title="Tên" />
        <ExcelExportColumn field="model_number" title="Model" />
        <ExcelExportColumn field="nameCate" title="Loại tài sản" />
        <ExcelExportColumn field="amount" title="Số lượng" />
        <ExcelExportColumn field="unit" title="Đơn vị" />
        <ExcelExportColumn field="price_each" title="Giá (vnđ)" />
        <ExcelExportColumn field="purchase_date" title="Ngày mua" />
        <ExcelExportColumn field="status" title="Trạng thái sử dụng" />
        <ExcelExportColumn field="current_status" title="Tình trạng hiện tại" />
        <ExcelExportColumn field="description" title="Mô tả" />
      </ExcelExport>
    </Wrapper>
  );
}
