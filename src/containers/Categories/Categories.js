import React, { useState, useMemo, useCallback } from 'react';
import { Button } from 'react-bootstrap';

import data from '../../config/dataCategories';
import BaseModal from '../../components/BaseModal/BaseModal';
import Wraper from './Categories.style';
import TablePaginationData from '../../components/TablePaginationData/TablePaginationData';

export default function Categories() {
  const [modalConfirm, setModalConfirm] = useState(false);

  const toggleModalConfirm = useCallback(() => {
    setModalConfirm(!modalConfirm);
  }, [modalConfirm]);

  const restructureData = useMemo(() => {
    if (!data || !data.categories) return [];
    return data.categories.map((record, index) => ({
      ...record,
      index: index + 1,
      delete_row: (
        <Button variant="danger" size="sm" onClick={toggleModalConfirm}>
          <i class="fas fa-trash-alt"></i>
        </Button>
      ),
    }));
  }, [toggleModalConfirm]);

  const [modalAdd, setModalAdd] = useState(false);

  const toggleModal = () => {
    setModalAdd(!modalAdd);
  };
  return (
    <Wraper>
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
            field: 'delete_row',
          },
        ]}
        data={restructureData}
      />
      <BaseModal
        show={modalConfirm}
        onConfirm={toggleModalConfirm}
        onCancel={toggleModalConfirm}
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
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            <span>Bạn có chắc chắn muốn xóa?</span>
          </>
        }
      />
      <BaseModal
        show={modalAdd}
        title={'Thêm mới loại đồ dùng'}
        confirmText="Thêm mới"
        cancelText="Hủy bỏ"
        onConfirm={toggleModal}
        onCancel={toggleModal}
        typeBtnConfirm="success"
        content={
          <>
            <div className="form-group">
              <label htmlFor="nameType">Tên:</label>
              <input type="text" className="form-control" id="nameType" />
            </div>
            <div className="form-group">
              <label htmlFor="manager">Đơn vị quản lý/Người quản lý:</label>
              <input type="text" className="form-control" id="manager" />
            </div>
            <div className="form-group">
              <label htmlFor="note">Ghi chú:</label>
              <textarea type="text" className="form-control" id="note" />
            </div>
          </>
        }
      />
    </Wraper>
  );
}
