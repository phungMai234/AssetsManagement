import React from 'react';
import { Modal, Button, Form, Col, Row, Table } from 'react-bootstrap';

import WrapperModal from './ModalListSeri.styles';
import { TYPE_BTN_CANCEL } from 'utils/constant';
import Label from 'components/Label';
import ClearButton from 'components/ClearButton';
import ItemAssets from '../ItemAssets';

const ModalListSeri = ({
  values,
  errors,
  setFieldValue,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
  onHide,
  isEdit,
  data,
  ...props
}) => {
  return (
    <WrapperModal centered onHide={onHide} show {...props} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{'Thông tin danh sách số seri đang quản lý'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ItemAssets values={values?.seri_list || []} setFieldValue={setFieldValue} errors={errors} touched={touched} />
      </Modal.Body>

      <Modal.Footer>
        <Button size="sm" type="button" disabled={isSubmitting} variant={TYPE_BTN_CANCEL} onClick={onHide}>
          Hủy bỏ
        </Button>
        <Button
          size="sm"
          type="submit"
          disabled={isSubmitting}
          variant={isEdit ? 'info' : 'success'}
          onClick={handleSubmit}
        >
          {'Lưu lại thay đổi'}
        </Button>
      </Modal.Footer>
    </WrapperModal>
  );
};
export default ModalListSeri;
