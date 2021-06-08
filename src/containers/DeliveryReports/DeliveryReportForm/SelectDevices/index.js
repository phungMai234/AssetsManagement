import React from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';
import LabelReNew from 'components/Label';
import { PlusCircle, MinusCircle } from 'react-feather';
import Select from 'react-select';
import { parseDataExcel } from '../parseData';

const SelectDevices = ({ values, dataDevices, setFieldValue, errors, touched }) => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <LabelReNew isRequired>Danh sách tài sản</LabelReNew>
              </Form.Label>
            </Form.Group>
          </Row>
          <Row className="row-title">
            <Col md={1}>
              <LabelReNew>STT</LabelReNew>
            </Col>
            <Col md={5}>
              <LabelReNew isRequired>Tên tài sản</LabelReNew>
            </Col>
            <Col md={4}>
              <LabelReNew isRequired>Số lượng</LabelReNew>
            </Col>
          </Row>
          {!!values &&
            !!values.length &&
            values.map((device, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Form.Group as={Col} md="1" className="wrapper-button-del">
                      <Form.Label>
                        <LabelReNew>{`${index + 1}`} </LabelReNew>
                      </Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md="5" className="name-asset">
                      <Select
                        value={device.device_info}
                        defaultValue={device.device_info}
                        onChange={(option) => {
                          setFieldValue(`orderDetails.${index}.device_info`, option);
                        }}
                        options={parseDataExcel(dataDevices)}
                        isClearable={true}
                        placeholder="Chọn 1 tài sản"
                      />
                      <div className="error">
                        {touched.orderDetails && !!errors.orderDetails && !!errors.orderDetails[index] && (
                          <>
                            {typeof errors.orderDetails[index] === 'string'
                              ? errors.orderDetails[index]
                              : errors.orderDetails[index].device_info}
                          </>
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Control
                        type="text"
                        name="amount"
                        value={device?.amount}
                        onChange={(e) => setFieldValue(`orderDetails.${index}.amount`, e.target.value)}
                        isInvalid={
                          touched.orderDetails &&
                          errors.orderDetails &&
                          errors.orderDetails[index] &&
                          errors.orderDetails[index]?.amount
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {!!errors?.orderDetails && errors?.orderDetails[index]?.amount}
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
                      <Col md={1} className="wrapper-button-del"></Col>
                      <Form.Group as={Col} md="4" className="name-asset">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setFieldValue('orderDetails', [
                              ...values,
                              { device_info: null, amount: '', index: values?.length },
                            ]);
                          }}
                        >
                          <PlusCircle size={20} />
                          Tạo bản ghi
                        </Button>
                      </Form.Group>
                    </Row>
                  )}
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
};

export default SelectDevices;
