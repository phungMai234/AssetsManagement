import React from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

import DatePickerInput from 'components/DatePickerInput';
import Wrapper from './ItemEdit.style';
import Label from 'components/Label';
import { useQuery } from 'hooks/useQuery';
import Loading from 'components/Loading';
import PhotoUpload from 'components/PhotoUploadRenew';
import BreadCrumb from 'components/BreadCrumb';
import ClearButton from 'components/ClearButton';
import { Plus, Edit3 } from 'react-feather';
import { STATUS_LIST, UNIT_LIST } from 'utils/constant';

const ItemEdit = ({
  isEdit,
  values,
  errors,
  setFieldValue,
  setSubmitting,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
}) => {
  const { data: dataCate, loading } = useQuery({ url: 'categories' });

  const breadcrumb = [
    {
      url: '/dashboard/assets',
      title: 'Danh sách tài sản',
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
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                variant={isEdit ? 'info' : 'success'}
                className="btn-add"
                size="sm"
              >
                {isEdit ? <Edit3 size={20} /> : <Plus size={20} />}
                <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
              </Button>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>
                <Label>Model</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="model_number"
                value={values.model_number}
                onChange={handleChange}
                isInvalid={touched.model_number && !!errors.model_number}
              />
              {!!values.model_number && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('model_number', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.model_number}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>
                <Label isRequired>Mã tài sản</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="serial_number"
                value={values.serial_number}
                onChange={handleChange}
                isInvalid={touched.serial_number && !!errors.serial_number}
              />
              {!!values.serial_number && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('serial_number', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.serial_number}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="8">
              <Form.Label>
                <Label isRequired>Tên thiết bị</Label>
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

            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Loại tài sản</Label>
              </Form.Label>
              <Form.Control
                name="id_category"
                onChange={(e) => setFieldValue('id_category', e.target.value)}
                as="select"
                isInvalid={!!errors.id_category && !!touched.id_category}
                value={values?.id_category}
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
          </Row>

          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label>Nơi sản xuất</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="origin"
                value={values.origin}
                onChange={handleChange}
                isInvalid={touched.origin && !!errors.origin}
              />
              {!!values.origin && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('origin', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.origin}</Form.Control.Feedback>
            </Form.Group>
            <Col md={4} className={touched.purchase_date && errors.purchase_date ? 'has-error' : ''}>
              <Form.Label>
                <Label isRequired>Ngày mua</Label>
              </Form.Label>
              <DatePickerInput
                name="purchase_date"
                onSelect={(date) => {
                  if (!date) {
                    setFieldValue('purchase_date', new Date());
                    return;
                  }
                  setFieldValue('purchase_date', new Date(date));
                }}
                value={values.purchase_date || new Date()}
              />
              {!!errors.purchase_date && !!touched.purchase_date && <p className="error">{errors.purchase_date}</p>}
            </Col>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Tình trạng hiện nay</Label>
              </Form.Label>
              <Form.Control
                name="status"
                onChange={(e) => setFieldValue('status', e.target.value)}
                as="select"
                isInvalid={!!errors.status && !!touched.status}
                value={values?.status}
              >
                <option key="" value="">
                  Chọn 1 trạng thái
                </option>
                {(STATUS_LIST || []).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label>Đơn vị tính</Label>
              </Form.Label>
              <Form.Control
                name="unit"
                onChange={(e) => setFieldValue('unit', e.target.value)}
                as="select"
                isInvalid={!!errors.unit && !!touched.unit}
                value={values?.unit}
              >
                <option key="" value="">
                  Chọn 1 loại đơn vị
                </option>
                {(UNIT_LIST || []).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label isRequired>Nguyên giá (VNĐ)</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="original_price"
                value={values.original_price}
                onChange={handleChange}
                isInvalid={touched.original_price && !!errors.original_price}
              />
              {!!values.original_price && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('original_price', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.original_price}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Label>Giá trị còn lại(VNĐ)</Label>
              </Form.Label>
              <Form.Control
                type="text"
                name="real_price"
                value={values.real_price}
                onChange={handleChange}
                isInvalid={touched.real_price && !!errors.real_price}
              />
              {!!values.real_price && (
                <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('real_price', '')} />
              )}

              <Form.Control.Feedback type="invalid">{errors.real_price}</Form.Control.Feedback>
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
              <PhotoUpload name="image_detail" setSubmitting={setSubmitting} />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </Wrapper>
  );
};
export default ItemEdit;
