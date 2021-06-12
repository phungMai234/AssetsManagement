import React from 'react';

import { Row, Col, Form } from 'react-bootstrap';
import LabelReNew from 'components/Label';
import { PlusCircle, Trash2 } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 400px;
  overflow-y: auto;
  .wrapper-button-del {
    margin-top: 5px;
  }
`;
const SelectDevices = ({ values, setFieldValue, errors, touched }) => {
  return (
    <Wrapper>
      <Row>
        <Col md={4}>
          <LabelReNew isRequired>Số seri</LabelReNew>
        </Col>
        <Col md={4}>
          <LabelReNew isRequired>Trạng thái</LabelReNew>
        </Col>
        <Col md={3}>
          <LabelReNew isRequired>Tình trạng hiện tại</LabelReNew>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {!!values &&
            !!values.length &&
            values.map((device, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Form.Group as={Col} md="4" className="name-asset">
                      <Form.Control
                        type="text"
                        name="serial_number"
                        value={device.serial_number}
                        onChange={(e) => setFieldValue(`seri_list.${index}.serial_number`, e.target.value)}
                        isInvalid={touched.serial_number && !!errors.serial_number}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Control
                        type="text"
                        name="status"
                        value={device.status}
                        onChange={(e) => setFieldValue(`seri_list.${index}.status`, e.target.value)}
                        isInvalid={touched.status && !!errors.status}
                      />
                      <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                      <Form.Control
                        type="text"
                        name="status_order"
                        value={device?.status_order}
                        onChange={(e) => setFieldValue(`seri_list.${index}.status_order`, e.target.value)}
                        isInvalid={
                          touched.seri_list &&
                          errors.seri_list &&
                          errors.seri_list[index] &&
                          errors.seri_list[index]?.status_order
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {!!errors?.seri_list && errors?.seri_list[index]?.status_order}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {index > 0 && (
                      <div md="1" className="wrapper-button-del">
                        <Trash2
                          color="red"
                          size={20}
                          onClick={() => {
                            let arrayDeviceRemoved = [...values];
                            arrayDeviceRemoved.splice(index, 1);
                            setFieldValue('seri_list', arrayDeviceRemoved);
                          }}
                        />
                      </div>
                    )}
                  </Row>

                  {index === values.length - 1 && (
                    <Row>
                      <Form.Group as={Col} md="1" className="name-asset">
                        <PlusCircle
                          size={20}
                          onClick={() => {
                            setFieldValue('seri_list', [
                              ...values,
                              { serial_number: '', status_order: '', status: '', index: values?.length },
                            ]);
                          }}
                        />
                      </Form.Group>
                    </Row>
                  )}
                </div>
              );
            })}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default SelectDevices;
