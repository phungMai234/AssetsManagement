import React, { useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';

import BaseModal from 'components/BaseModal/BaseModal';
import Wrapper from './Categories.style';
import TablePaginationData from 'components/TablePaginationData';
import NewPage from './NewPage';
import EditPage from './EditPage';
import { Plus, Edit3, Trash2, AlertTriangle } from 'react-feather';
import { useQuery } from 'hooks/useQuery';
import useDelete from 'hooks/useDelete';

export default function Categories() {
  const [recordSelected, setRecordSelected] = useState();
  const [recordSelectedDel, setRecordSelectedDel] = useState();

  const { data: dataCategories, loading, force } = useQuery({ url: 'categories' });

  const [remove] = useDelete({
    id: recordSelectedDel?.id,
    nameCollection: 'categories',
    callback: () => {
      force();
    },
  });

  const restructureData = useMemo(() => {
    if (!dataCategories || !dataCategories.length) return [];
    return dataCategories.map((record, index) => ({
      ...record,
      index: index + 1,
      edit_row: (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setRecordSelected(record);
          }}
        >
          Chỉnh sửa
        </Button>
      ),
      note: <div title={record?.note}>{record?.note}</div>,
      delete_row: (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setRecordSelectedDel(record);
          }}
        >
          <Trash2 size={20} />
        </Button>
      ),
    }));
  }, [dataCategories, setRecordSelected]);

  const [modalAdd, setModalAdd] = useState(false);

  const toggleModal = () => {
    setModalAdd(!modalAdd);
  };

  return (
    <Wrapper>
      <div className="header-content">
        <Button variant="success" size="sm" onClick={toggleModal}>
          <Plus size={20} />
          <span>Thêm mới</span>
        </Button>
      </div>
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
            name: 'Đơn vị quản lý',
            field: 'manager',
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
      {recordSelected && <EditPage record={recordSelected} onCancel={() => setRecordSelected(null)} />}
    </Wrapper>
  );
}
