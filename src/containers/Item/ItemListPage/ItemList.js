import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import Wrapper from './ItemList.style.js';
import BaseModal from '../../../components/BaseModal';
import MultipleImageUpload from '../../../components/multipleImageUpload/multipleImageUpload';
import TablePaginationData from '../../../components/TablePaginationData/TablePaginationData';
import BoxSearch from '../../../components/BoxSearch/BoxSearch';
import BoxSelect from '../../../components/BoxSelect/BoxSelect';
import dataCategories from '../../../config/dataCategories';
import DatePickerInput from '../../../components/DatePickerInput';
import db from '../../../database';

export default function Item() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [dataItems, setDataItems] = useState([]);

  const toggleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const toggleModalConfirm = useCallback(() => {
    setModalConfirm(!modalConfirm);
  }, [modalConfirm]);

  useEffect(() => {
    db.collection('devices').onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setDataItems(result);
    });
  }, [db, setDataItems]);

  const restructureData = useMemo(() => {
    if (!dataItems) return [];
    return dataItems.map((record, index) => ({
      ...record,
      index: index + 1,
      go_to_detail: <button className="btn btn-outline-info">Chi tiết</button>,
      delete_record: (
        <Button variant="danger" size="sm" onClick={toggleModalConfirm}>
          <i className="fas fa-trash-alt"></i>
        </Button>
      ),
    }));
  }, [toggleModalConfirm, dataItems]);

  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-8">
          <div className="row ">
            <div className="col-lg-6">
              <BoxSearch />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <BoxSelect title={'Loại'} data={dataCategories.categories} />
            </div>
            <div className="col-lg-6">
              <DatePickerInput />
            </div>
          </div>
        </div>

        <div className="col-lg-4 border-place">
          <Button variant="primary" size="sm" onClick={toggleModalAdd}>
            <i className="fas fa-plus"></i>
            <span>Thêm mới</span>
          </Button>
          <Button variant="success" size="sm">
            <i className="fas fa-file-import"></i>
            <span>Nhập file</span>
          </Button>
        </div>
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
            name: 'Ngày nhập',
            field: 'import_date',
          },
          {
            name: 'Loại',
            field: 'type',
          },
          {
            name: 'Số lượng',
            field: 'amount',
          },
          {
            name: 'Người quản lý/Đơn vị quản lý',
            field: 'manager',
          },
          {
            name: 'Tình trạng',
            field: 'status',
          },
          {
            name: '',
            field: 'go_to_detail',
          },
          {
            name: '',
            field: 'delete_record',
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
              <i className="fas fa-exclamation-triangle"></i>
            </span>
            <span>Bạn có chắc chắn muốn xóa?</span>
          </>
        }
      />
      <BaseModal
        show={showModalAdd}
        title={'Thêm mới loại đồ dùng'}
        toggleModal={toggleModalAdd}
        confirmTextBtn="Thêm mới"
        cancelTextBtn="Hủy bỏ"
        onSelect={toggleModalAdd}
        onCancel={toggleModalAdd}
        help={null}
        content={
          <>
            <div className="form-group">
              <label for="usr">Tên:</label>
              <input type="text" className="form-control" id="usr" />
            </div>
            <MultipleImageUpload />
            <div className="form-group">
              <label for="pwd">Loại:</label>
              <input type="text" className="form-control" id="pwd" />
            </div>
            <div className="form-group">
              <label for="pwd">Số lượng:</label>
              <input type="text" className="form-control" id="pwd" />
            </div>
            <div className="form-group">
              <label for="pwd">Ngày nhập kho:</label>
              <input type="text" className="form-control" id="pwd" />
            </div>
            <div className="form-group">
              <label for="pwd">Tình trạng:</label>
              <input type="text" className="form-control" id="pwd" />
            </div>
          </>
        }
      />
    </Wrapper>
  );
}
