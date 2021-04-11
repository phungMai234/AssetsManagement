import React from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

import DatePickerInput from '../../../components/DatePickerInput';
import Wrapper from './ItemEdit.style';
import Label from '../../../components/Label';
import { useQuery } from 'hooks/useQuery';
import Loading from 'components/Loading';
import PhotoUpload from 'components/PhotoUploadRenew';
import BreadCrumb from 'components/BreadCrumb';
import ClearButton from 'components/ClearButton';
import { Plus, Edit } from 'react-feather';

const ItemEdit = ({ isEdit, values, errors, setFieldValue, handleChange, handleSubmit, touched, isSubmitting }) => {
  const { data: dataCate, loading } = useQuery({ url: 'categories' });

  const breadcrumb = [
    {
      url: '/dashboard/devices',
      title: 'Danh sách các thiết bị',
    },
    {
      url: '',
      title: isEdit ? 'Chỉnh sửa' : 'Tạo mới',
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container>
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
          </Row>

          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Loại tài sản</Label>
              </Form.Label>
              <Form.Control
                name="id_category"
                onChange={(e) => setFieldValue('id_category', e.target.value)}
                as="select"
                isInvalid={!!errors.id_category && !!touched.id_category}
              >
                <option key="" value="">
                  Chọn 1 loại tài sản
                </option>
                {(dataCate || []).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.id_category}</Form.Control.Feedback>
            </Form.Group>
            <Col md={4} className={touched.import_date && errors.import_date ? 'has-error' : ''}>
              <Form.Label>
                <Label isRequired>Ngày mua</Label>
              </Form.Label>
              <DatePickerInput
                name="import_date"
                onSelect={(date) => {
                  if (!date) {
                    setFieldValue('import_date', new Date());
                    return;
                  }
                  setFieldValue('import_date', new Date(date));
                }}
                value={values.import_date || new Date()}
              />
              {!!errors.import_date && !!touched.import_date && <p className="error">{errors.import_date}</p>}
            </Col>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label>Tình trạng</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={values.status}
                onChange={handleChange}
                isInvalid={touched.status && !!errors.status}
              />
              {!!values.status && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('status', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Số lượng</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                isInvalid={touched.amount && !!errors.amount}
              />
              {!!values.amount && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('amount', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label>Đơn vị</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={values.unit}
                onChange={handleChange}
                isInvalid={touched.unit && !!errors.unit}
              />
              {!!values.unit && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('unit', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Đơn giá</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="price_each"
                value={values.price_each}
                onChange={handleChange}
                isInvalid={touched.price_each && !!errors.price_each}
              />
              {!!values.price_each && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('price_each', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.price_each}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>
                <Label>Mô tả</Label>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={touched.description && !!errors.description}
              />
              {!!values.description && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('description', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <PhotoUpload name="image_detail" />
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
      </Container>
    </Wrapper>
  );
};
export default ItemEdit;
