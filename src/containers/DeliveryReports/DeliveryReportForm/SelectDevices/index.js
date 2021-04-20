import React from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';
import LabelReNew from 'components/Label';
import { PlusCircle, MinusCircle } from 'react-feather';

const SelectDevices = ({ values, dataDevices, setFieldValue, errors, touched }) => {
  return (
    <div>
      {!!values &&
        !!values.length &&
        values.map((device, index) => {
          return (
            <Row key={index}>
              <Col md={12}>
                <Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      <LabelReNew isRequired>Danh sách tài sản </LabelReNew>
                    </Form.Label>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="2" className="wrapper-button-del">
                    <Form.Label>
                      <LabelReNew>{`Tài sản ${index + 1}`} </LabelReNew>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      <LabelReNew isRequired>Tên tài sản</LabelReNew>
                    </Form.Label>
                    <Form.Control
                      name="id_device"
                      value={device.id_device}
                      onChange={(e) => setFieldValue(`orderDetails.${index}.id_device`, e.target.value)}
                      as="select"
                      isInvalid={touched?.orderDetails && errors.orderDetails && errors.orderDetails[index]}
                    >
                      <option key="" value="">
                        Chọn 1 tài sản
                      </option>
                      {(dataDevices || []).map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {touched.orderDetails && !!errors.orderDetails && !!errors.orderDetails[index] && (
                        <>
                          {typeof errors.orderDetails[index] === 'string'
                            ? errors.orderDetails[index]
                            : errors.orderDetails[index].id_device}
                        </>
                      )}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      <LabelReNew isRequired>Số lượng</LabelReNew>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity_ordered"
                      value={device?.quantity_ordered}
                      onChange={(e) => setFieldValue(`orderDetails.${index}.quantity_ordered`, e.target.value)}
                      isInvalid={
                        touched.orderDetails &&
                        errors.orderDetails &&
                        errors.orderDetails[index] &&
                        errors.orderDetails[index]?.quantity_ordered
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {!!errors?.orderDetails && errors?.orderDetails[index]?.quantity_ordered}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {index > 0 && (
                    <Form.Group as={Col} md="2" className="wrapper-button-del">
                      <div className="btn-del">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            let arrayDeviceRemoved = [...values];
                            arrayDeviceRemoved.splice(index, 1);
                            setFieldValue('orderDetails', arrayDeviceRemoved);
                          }}
                        >
                          <MinusCircle size={20} />
                          Xóa bản ghi
                        </Button>
                      </div>
                    </Form.Group>
                  )}
                </Row>
                <hr className="divide" />

                {index === values.length - 1 && (
                  <Row>
                    <Col md={2}></Col>
                    <Form.Group as={Col} md="4">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setFieldValue('orderDetails', [
                            ...values,
                            { id_device: '', quantity_ordered: 0, index: values?.length },
                          ]);
                        }}
                      >
                        <PlusCircle size={20} />
                        Tạo bản ghi
                      </Button>
                    </Form.Group>
                  </Row>
                )}
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default SelectDevices;
