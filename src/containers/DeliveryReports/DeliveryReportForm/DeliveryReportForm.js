import React from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

import DatePickerInput from 'components/DatePickerInput';
import Wrapper from './DeliveryReportForm.styles';
import Label from 'components/Label';
import { useQuery } from 'hooks/useQuery';
import Loading from 'components/Loading';
import BreadCrumb from 'components/BreadCrumb';
import ClearButton from 'components/ClearButton';
import { Plus, Edit } from 'react-feather';
import SelectDevices from './SelectDevices';
import UploadFiles from './UploadFiles';
import { LIST_STATUS } from 'utils/constant';

const ItemEdit = ({ isEdit, values, errors, setFieldValue, handleChange, handleSubmit, touched, isSubmitting }) => {
  const { data: dataDevices, loading } = useQuery({ url: 'devices' });

  const breadcrumb = [
    {
      url: '/dashboard/delivery_reports',
      title: 'Danh sách biên bản',
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
      <Row>
        <Col md={6}>
          <BreadCrumb breadcrumb={breadcrumb} />
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="12" className="wrapper-button">
            <Button type="submit" variant={isEdit ? 'info' : 'success'} className="btn-add" size="sm">
              {isEdit ? <Edit size={20} /> : <Plus size={20} />}
              <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
            </Button>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="12">
            <Form.Label>
              <Label isRequired>Tên người mượn</Label>
            </Form.Label>
            <Form.Control
              type="text"
              name="user_name"
              value={values.user_name}
              onChange={handleChange}
              isInvalid={touched.user_name && !!errors.user_name}
            />
            {!!values.user_name && (
              <ClearButton size="medium" className="btn-close" onClick={() => setFieldValue('user_name', '')} />
            )}

            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="4" className={touched.date_borrowed && errors.date_borrowed ? 'has-error' : ''}>
            <Form.Label>
              <Label isRequired>Ngày mượn</Label>
            </Form.Label>
            <DatePickerInput
              name="date_borrowed"
              onSelect={(date) => {
                if (!date) {
                  setFieldValue('date_borrowed', new Date());
                  return;
                }
                setFieldValue('date_borrowed', new Date(date));
              }}
              value={values.date_borrowed || new Date()}
            />
            {!!errors.date_borrowed && !!touched.date_borrowed && <p className="error">{errors.date_borrowed}</p>}
          </Form.Group>
          <Form.Group as={Col} md="4" className={touched.date_return && errors.date_return ? 'has-error' : ''}>
            <Form.Label>
              <Label>Ngày trả</Label>
            </Form.Label>
            <DatePickerInput
              name="date_return"
              onSelect={(date) => {
                if (!date) {
                  setFieldValue('date_return', new Date());
                  return;
                }
                setFieldValue('date_return', new Date(date));
              }}
              value={values.date_return || ''}
            />
            {!!errors.date_return && !!touched.date_return && <p className="error">{errors.date_return}</p>}
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>
              <Label isRequired>Trạng thái</Label>
            </Form.Label>
            <Form.Control
              name="status"
              value={values?.status}
              onChange={(e) => setFieldValue('status', e.target.value)}
              as="select"
              isInvalid={!!errors.status && !!touched.status}
            >
              {(LIST_STATUS || []).map((e, index) => (
                <option key={index} value={e.value}>
                  {e.label}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <SelectDevices
          dataDevices={dataDevices}
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

        <UploadFiles name="files" errors={errors} touched={touched} />

        <Row>
          <Form.Group as={Col} md="12" className="wrapper-button">
            <Button type="submit" variant={isEdit ? 'info' : 'success'} className="btn-add" size="sm">
              {isEdit ? <Edit size={20} /> : <Plus size={20} />}
              <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Wrapper>
  );
};
export default ItemEdit;
