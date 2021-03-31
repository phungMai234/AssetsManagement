import React from 'react';
import { XCircle } from 'react-feather';
import { Button, Row, Col } from 'react-bootstrap';

import DatePickerInput from '../../../components/DatePickerInput';
import Wrapper from './ItemEdit.style';
import Label from '../../../components/Label';
import { useQuery } from 'hooks/useQuery';
import Loading from 'components/Loading';
import PhotoUpload from 'components/PhotoUploadRenew';
import BreadCrumb from 'components/BreadCrumb';

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
      <Row>
        <Col md={6}>
          <BreadCrumb breadcrumb={breadcrumb} />
        </Col>
      </Row>

      <form onSubmit={handleSubmit}>
        <Row className="info-item">
          <Col md={5} className={touched.name && errors.name ? 'has-error' : ''}>
            <Label isRequired>Tên: </Label>
            <input type="text" className="text-input" value={values?.name} name="name" onChange={handleChange} />
            {!!values.name && <XCircle className="btn-close" onClick={() => setFieldValue('name', '')} />}
            {!!errors.name && !!touched.name && <p className="error">{errors.name}</p>}
          </Col>
          <Col md={1} />
          <Col md={5} className={touched.id_category && errors.id_category ? 'has-error' : ''}>
            <Label>Loại tài sản: </Label>
            <select
              id="option"
              name="id_category"
              className="input-select"
              value={values?.id_category}
              onChange={handleChange}
            >
              {(dataCate || []).map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            {!!errors.id_category && !!touched.id_category && <p className="error">{errors.id_category}</p>}
          </Col>
        </Row>

        <Row className="info-item">
          <Col md={5} className={touched.import_date && errors.import_date ? 'has-error' : ''}>
            <Label>Ngày mua: </Label>
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
          <Col md={1} />
          <Col md={5} className={touched.status && errors.status ? 'has-error' : ''}>
            <Label isRequired>Tình trạng: </Label>

            <input type="text" className="text-input" value={values?.status} name="status" onChange={handleChange} />
            {!!values.status && <XCircle className="btn-close" onClick={() => setFieldValue('status', '')} />}
            {!!errors.status && !!touched.status && <p className="error">{errors.status}</p>}
          </Col>
        </Row>

        <Row className="info-item">
          <Col md={5} className={touched.price_each && errors.price_each ? 'has-error' : ''}>
            <Label isRequired>Giá 1 thiết bị: </Label>

            <input
              type="text"
              className="text-input"
              value={values?.price_each}
              name="price_each"
              onChange={handleChange}
            />
            {!!values.price_each && <XCircle className="btn-close" onClick={() => setFieldValue('price_each', '')} />}
            {!!errors.price_each && !!touched.price_each && <p className="error">{errors.price_each}</p>}
          </Col>
          <Col md={1} />
          <Col md={5} className={touched.amount && errors.amount ? 'has-error' : ''}>
            <Label isRequired>Số lượng: </Label>

            <input type="text" className="text-input" value={values?.amount} name="amount" onChange={handleChange} />
            {!!values.amount && <XCircle className="btn-close" onClick={() => setFieldValue('amount', '')} />}
            {!!errors.amount && !!touched.amount && <p className="error">{errors.amount}</p>}
          </Col>
        </Row>

        <Row className="info-item">
          <Col md={11} className={touched.unit && errors.unit ? 'has-error' : ''}>
            <Label>Đơn vị: </Label>

            <input type="text" className="text-input" value={values?.unit} name="unit" onChange={handleChange} />
            {!!values.unit && <XCircle className="btn-close" onClick={() => setFieldValue('unit', '')} />}
            {!!errors.unit && !!touched.unit && <p className="error">{errors.unit}</p>}
          </Col>
        </Row>
        <Row className="info-item">
          <Col md={11} className={touched.description && errors.description ? 'has-error' : ''}>
            <Label>Mô tả: </Label>
            <textarea
              type="text"
              rows="6"
              className="text-input"
              value={values?.description}
              name="description"
              onChange={handleChange}
            />
            {!!values.description && <XCircle className="btn-close" onClick={() => setFieldValue('description', '')} />}
            {!!errors.description && !!touched.description && <p className="error">{errors.description}</p>}
          </Col>
        </Row>
        <Row className="info-item">
          <Col md={11}>
            <PhotoUpload name="image_detail" />
          </Col>
        </Row>

        <Row className="info-item">
          <Col md={4}>
            <Button type="submit" variant="success" size="sm">
              {isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}
            </Button>
          </Col>
        </Row>
      </form>
    </Wrapper>
  );
};
export default ItemEdit;
