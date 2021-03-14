import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import WrapperModal from './ModalAddCategory.styles';
import { TYPE_BTN_CONFIRM, TYPE_BTN_CANCEL } from '../../../utils/constant';
import Label from '../../../components/Label';

const ModalAddCategory = ({
  values,
  errors,
  setFieldValue,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
  onHide,
  title,
  dirty,
  isEdit,
  ...props
}) => {
  return (
    <WrapperModal centered onHide={onHide} show {...props} backdrop="static">
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Chỉnh sửa loại tài sản ' : 'Thêm mới loại tài sản'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <Label isRequired>Tên</Label>
          <input type="text" className="form-control" name="name" onChange={handleChange} value={values.name} />
          {errors.name && touched.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <Label isRequired>Đơn vị quản lý/Người quản lý</Label>
          <input type="text" className="form-control" name="manager" onChange={handleChange} value={values.manager} />
          {errors.manager && touched.manager && <div className="error">{errors.manager}</div>}
        </div>
        <div className="form-group">
          <Label>Ghi chú</Label>
          <textarea type="text" className="form-control" name="note" onChange={handleChange} value={values.note} />
          {errors.note && touched.note && <div className="error">{errors.note}</div>}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button size="sm" type="button" variant={TYPE_BTN_CANCEL} onClick={onHide}>
          Hủy bỏ
        </Button>
        <Button
          size="sm"
          type="submit"
          variant={isEdit ? TYPE_BTN_CONFIRM : 'success'}
          onClick={() => {
            handleSubmit();
            onHide();
          }}
        >
          {!isEdit ? 'Thêm mới' : 'Chỉnh sửa '}
        </Button>
      </Modal.Footer>
    </WrapperModal>
  );
};
export default ModalAddCategory;
