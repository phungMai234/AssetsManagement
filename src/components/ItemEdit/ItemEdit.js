import React from 'react';

import BoxSelect from '../BoxSelect';
import dataCategories from '../../config/dataCategories';
import DatePickerInput from '../DatePickerInput';
import MultipleImageUpload from '../multipleImageUpload/multipleImageUpload';
import Wrapper from './ItemEdit.style';
import { Button } from 'react-bootstrap';

const ItemEdit = ({
  record,
  values,
  errors,
  setFieldValue,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
  onHide,
}) => {
  return (
    <Wrapper>
      <form handleSubmit={handleSubmit}>
        <div className="row wrapper-form">
          <div className="col-sm-8">
            {/* name */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Tên: </label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <input
                  type="text"
                  className="text-input"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />
                <span className="help-text">{errors.name}</span>
              </div>
            </div>
            {/* type  */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Loại: </label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <BoxSelect data={dataCategories.categories} />
                <span className="help-text">{errors.type}</span>
              </div>
            </div>
            {/* date add */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Ngày nhập kho: </label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <DatePickerInput />
                <span className="help-text">{errors.date_add}</span>
              </div>
            </div>
            {/* Số lượng */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Số lượng : </label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <input
                  type="text"
                  className="text-input"
                  value={values.mount}
                  name="mount"
                  onChange={handleChange}
                />
                <span className="help-text">{errors.mount}</span>
              </div>
            </div>
            {/* Tình trạng */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Tình trạng : </label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <input
                  type="text"
                  className="text-input"
                  value={values.status}
                  name="status"
                  onChange={handleChange}
                />
                <span className="help-text">{errors.status}</span>
              </div>
            </div>
            {/* Manager */}
            <div className="row group-form">
              <label className="col-sm-3 label-input">Người quản lý:</label>
              <div className="col-sm-9" style={{ display: 'grid' }}>
                <input
                  type="text"
                  className="text-input"
                  value={values.manager}
                  name="manager"
                  onChange={handleChange}
                />
                <span className="help-text">{errors.manager}</span>
              </div>
            </div>
          </div>
          {/* giá trị, đã mượn, đã trả, còn trong kho */}
          <div className="col-sm-4">
            <MultipleImageUpload />
          </div>
        </div>
      </form>
      <Button variant="success" size="sm">
        Chỉnh sửa
      </Button>
    </Wrapper>
  );
};
export default ItemEdit;
