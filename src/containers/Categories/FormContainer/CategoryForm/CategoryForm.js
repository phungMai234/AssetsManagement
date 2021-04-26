import React from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

import Wrapper from './CategoryForm.styles';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import ClearButton from 'components/ClearButton';
import { Plus, Edit } from 'react-feather';
import ProductLine from '../Productline';

const CateGoryForm = ({ isEdit, values, errors, setFieldValue, handleChange, handleSubmit, touched, isSubmitting }) => {
  const breadcrumb = [
    {
      url: '/dashboard/categories',
      title: 'Danh sách loại tài sản',
    },
    {
      url: '',
      title: isEdit ? 'Chỉnh sửa' : 'Tạo mới',
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Row>
          <Col md={6}>
            <BreadCrumb breadcrumb={breadcrumb} />
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="12" className="wrapper-button">
              <Button type="submit" variant="success" className="btn-add" size="sm">
                {isEdit ? <Edit size={20} /> : <Plus size={20} />}
                <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
              </Button>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>
                <Label isRequired>Tên</Label>
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
                <Label isRequired>Đơn vị quản lý</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="manager"
                value={values.manager}
                onChange={handleChange}
                isInvalid={touched.manager && !!errors.manager}
              />
              {!!values.manager && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('manager', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.manager}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <ProductLine
            values={values?.orderDetails || []}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />

          <Row>
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

          <Row>
            <Form.Group as={Col} md="12" className="wrapper-button">
              <Button type="submit" variant="success" className="btn-add" size="sm">
                {isEdit ? <Edit size={20} /> : <Plus size={20} />}
                <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default CateGoryForm;
