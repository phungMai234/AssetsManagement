import React, { useState, useMemo } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import BaseModal from 'components/BaseModal/BaseModal';
import Wrapper from './ListPage.styles';
import TablePaginationData from 'components/TablePaginationData';
import NewPage from '../NewPage';
import EditPage from '../EditPage';
import { Plus, Edit3, Trash2, AlertTriangle, FilePlus } from 'react-feather';
import { useQuery } from 'hooks/useQuery';
import useDelete from 'hooks/useDelete';
import ModalImportFile from '../ModalImportFile';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import { filter, includes, lowerCase } from 'lodash';

const ListPage = () => {
  const [recordSelected, setRecordSelected] = useState();
  const [recordSelectedDel, setRecordSelectedDel] = useState();
  const [openModalImport, setOpenModalImport] = useState(false);
  const [params, setParams] = useState({});

  const { data: dataCategories, loading, force } = useQuery({ url: 'lecturers' });

  const [remove] = useDelete({
    id: recordSelectedDel?.id,
    nameCollection: 'lecturers',
    callback: () => {
      force();
    },
  });
  const recordItems = useMemo(() => {
    const customData = params.keyword
      ? filter(dataCategories, (item) => includes(lowerCase(item.name), lowerCase(params.keyword)))
      : dataCategories;
    return customData;
  }, [params, dataCategories]);

  const restructureData = useMemo(() => {
    if (!recordItems || !recordItems.length) return [];
    return recordItems.map((record, index) => ({
      ...record,
      index: index + 1,
      edit_row: (
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => {
            setRecordSelected(record);
          }}
        >
          <Edit3 size={20} />
        </Button>
      ),
      note: <div title={record?.note}>{record?.note}</div>,
      delete_row: (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setRecordSelectedDel(record);
          }}
        >
          <Trash2 size={20} />
        </Button>
      ),
    }));
  }, [recordItems]);

  const [modalAdd, setModalAdd] = useState(false);

  const toggleModal = () => {
    setModalAdd(!modalAdd);
  };

  return (
    <Wrapper>
      <Row>
        <Col md={4}>
          <BoxSearch
            placeholderText="Tìm kiếm theo tên"
            value={params.keyword}
            onChange={(e) => setParams({ ...params, keyword: e.target.value })}
          />
        </Col>
        <Col md={4}>
          <div className="header-content">
            <Button variant="success" size="sm" onClick={toggleModal}>
              <Plus size={20} />
              <span>Thêm mới</span>
            </Button>

            <Button variant="warning" size="sm" className="btn-import" onClick={() => setOpenModalImport(true)}>
              <FilePlus size={20} />
              <span>Nhập file</span>
            </Button>
          </div>
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
            name: 'Email',
            field: 'email',
          },
          {
            name: 'Ghi chú',
            field: 'note',
          },
          {
            name: '',
            field: 'edit_row',
          },
          {
            name: '',
            field: 'delete_row',
          },
        ]}
        data={restructureData}
        loading={loading}
      />
      <BaseModal
        show={!!recordSelectedDel}
        onConfirm={() => {
          remove();
          setRecordSelectedDel(null);
        }}
        onCancel={() => setRecordSelectedDel(null)}
        typeBtnConfirm="danger"
        confirmText="Xóa"
        typeModal="sm"
        content={
          <>
            <span
              style={{
                paddingRight: '5px',
              }}
            >
              <AlertTriangle size={50} fill={'#dc3545'} stroke="#fff" />
            </span>
            <span>Bạn có chắc chắn muốn xóa?</span>
          </>
        }
      />
      {modalAdd && <NewPage onCancel={() => setModalAdd(false)} />}
      {openModalImport && <ModalImportFile onCancel={() => setOpenModalImport(false)} />}
      {recordSelected && <EditPage record={recordSelected} onCancel={() => setRecordSelected(null)} />}
    </Wrapper>
  );
};

export default ListPage;
