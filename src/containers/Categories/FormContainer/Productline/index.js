import React from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';
import LabelReNew from 'components/Label';
import { PlusCircle, MinusCircle } from 'react-feather';

const ProductLine = ({ values, setFieldValue, errors, touched }) => {
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
                      <LabelReNew isRequired>Danh sách các mẫu tài sản </LabelReNew>
                    </Form.Label>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="1" className="wrapper-button-del">
                    <Form.Label>
                      <LabelReNew>{`Mẫu ${index + 1}`} </LabelReNew>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Form.Label>
                      <LabelReNew isRequired>Mã mẫu</LabelReNew>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="product_line_code"
                      value={device?.product_line_code}
                      onChange={(e) => setFieldValue(`orderDetails.${index}.product_line_code`, e.target.value)}
                      isInvalid={
                        touched.orderDetails &&
                        errors.orderDetails &&
                        errors.orderDetails[index] &&
                        errors.orderDetails[index]?.product_line_code
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {!!errors?.orderDetails && errors?.orderDetails[index]?.product_line_code}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                    <Form.Label>
                      <LabelReNew isRequired>Tên</LabelReNew>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={device?.name}
                      onChange={(e) => setFieldValue(`orderDetails.${index}.name`, e.target.value)}
                      isInvalid={
                        touched.orderDetails &&
                        errors.orderDetails &&
                        errors.orderDetails[index] &&
                        errors.orderDetails[index]?.name
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {!!errors?.orderDetails && errors?.orderDetails[index]?.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                    <Form.Label>
                      <LabelReNew>Mô tả</LabelReNew>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="text_description"
                      value={device?.text_description}
                      onChange={(e) => setFieldValue(`orderDetails.${index}.text_description`, e.target.value)}
                      isInvalid={
                        touched.orderDetails &&
                        errors.orderDetails &&
                        errors.orderDetails[index] &&
                        errors.orderDetails[index]?.text_description
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {!!errors?.orderDetails && errors?.orderDetails[index]?.text_description}
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
                          Xóa
                        </Button>
                      </div>
                    </Form.Group>
                  )}
                </Row>
                <hr className="divide" />

                {index === values.length - 1 && (
                  <Row>
                    <Col md={1}></Col>
                    <Form.Group as={Col} md="4">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setFieldValue('orderDetails', [
                            ...values,
                            { product_line_code: '', text_description: '', name: '', index: values?.length },
                          ]);
                        }}
                      >
                        <PlusCircle size={20} />
                        Tạo
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

export default ProductLine;
