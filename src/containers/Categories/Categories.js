import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import BaseModal from '../../components/BaseModal/BaseModal';
import Wrapper from './Categories.style';
import TablePaginationData from '../../components/TablePaginationData/TablePaginationData';
import db from '../../database';
import NewPage from './NewPage';
import EditPage from './EditPage';

export default function Categories() {
  const [dataCategories, setDataCategories] = useState();
  const [recordSelected, setRecordSelected] = useState();
  const [recordSelectedDel, setRecordSelectedDel] = useState();

  useEffect(() => {
    db.collection('categories').onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setDataCategories(result);
    });
  }, [db, setDataCategories]);

  const handleDeleteCategory = useCallback(() => {
    db.collection('categories')
      .doc(recordSelectedDel?.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }, [recordSelectedDel, db]);

  const restructureData = useMemo(() => {
    if (!dataCategories || !dataCategories.length) return [];
    return dataCategories.map((record, index) => ({
      ...record,
      index: index + 1,
      edit_row: (
        <Button
          variant="info"
          size="sm"
          onClick={() => {
            setRecordSelected(record);
          }}
        >
          <i className="fas fa-edit"></i>
        </Button>
      ),
      delete_row: (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setRecordSelectedDel(record);
          }}
        >
          <i className="fas fa-trash-alt"></i>
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
        <Button variant="primary" size="sm" onClick={toggleModal}>
          <i className="fas fa-plus"></i>
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
            name: 'Đơn vị quản lý/Người quản lý',
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
      />
      <BaseModal
        show={!!recordSelectedDel}
        onConfirm={() => {
          handleDeleteCategory();
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
                color: '#dc3545',
                fontSize: '30px',
                paddingRight: '10px',
              }}
            >
              <i className="fas fa-exclamation-triangle"></i>
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
