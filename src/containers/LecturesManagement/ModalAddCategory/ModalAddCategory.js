import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

import WrapperModal from './ModalAddCategory.styles';
import { TYPE_BTN_CONFIRM, TYPE_BTN_CANCEL } from 'utils/constant';
import Label from 'components/Label';
import ClearButton from 'components/ClearButton';

const ModalAddCategory = ({
  values,
  errors,
  setFieldValue,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
  onHide,
  isEdit,
  ...props
}) => {
  return (
    <WrapperModal centered onHide={onHide} show {...props} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Chỉnh sửa thông tin cán bộ ' : 'Thêm mới thông tin cán bộ'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>
                <Label isRequired>Tên cán bộ</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              {!!values.name && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('name', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Label>
                <Label isRequired>Email</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              {!!values.email && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('email', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Label>
                <Label>Ghi chú</Label>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                type="text"
                name="note"
                value={values.note}
                onChange={handleChange}
                isInvalid={touched.note && !!errors.note}
              />
              {!!values.note && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('note', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.note}</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
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
          {!isEdit ? 'Thêm mới' : 'Chỉnh sửa '}
        </Button>
      </Modal.Footer>
    </WrapperModal>
  );
};
export default ModalAddCategory;
