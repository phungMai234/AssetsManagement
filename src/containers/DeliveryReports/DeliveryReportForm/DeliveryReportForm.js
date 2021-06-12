import React, { useMemo } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

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
import Select from 'react-select';

const ItemEdit = ({
  isEdit,
  listId,
  values,
  errors,
  setFieldValue,
  handleChange,
  handleSubmit,
  touched,
  isSubmitting,
  setSubmitting,
}) => {
  const { data: dataDevices, loading } = useQuery({ url: 'assets' });
  const { data: dataLectures, loadingLecture } = useQuery({ url: 'lecturers' });

  const formatDataLecturers = useMemo(() => {
    if (loadingLecture) return [];

    const result = dataLectures.map((e) => ({
      name: e.name,
      label: e.name,
    }));
    return result;
  }, [dataLectures, loadingLecture]);

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

  if (loading || loadingLecture) {
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
            <Button
              type="submit"
              disabled={isSubmitting}
              variant={isEdit ? 'info' : 'success'}
              className="btn-add"
              size="sm"
            >
              {isEdit ? <Edit size={20} /> : <Plus size={20} />}
              <span>{isEdit ? 'Lưu lại thay đổi' : 'Tạo mới'}</span>
            </Button>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>
              <Label isRequired>Tên người mượn</Label>
            </Form.Label>
            <Select
              value={values.user_name}
              defaultValue={values.user_name}
              onChange={(option) => {
                setFieldValue('user_name', option);
              }}
              options={formatDataLecturers}
              isClearable={true}
              placeholder="Chọn tên người mượn"
            />

            {touched.user_name && errors.user_name && <div className="error">{errors.user_name}</div>}
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
          listId={listId}
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

        <UploadFiles name="files" errors={errors} touched={touched} setSubmitting={setSubmitting} />
      </Form>
    </Wrapper>
  );
};
export default ItemEdit;
