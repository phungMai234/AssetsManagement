import React, { useCallback } from 'react';

import { Modal, Button, Form, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MessageRes from 'components/MessageRes';
import useAlert from 'hooks/useAlert';
import { useHistory } from 'react-router-dom';
import { firebase, auth } from 'database';

const ModalChangePassword = ({ onClose }) => {
  const { alert, setAlert, clearAlert } = useAlert();
  const { history } = useHistory();
  const handleChangePassWord = useCallback(
    (values) => {
      const user = auth.currentUser;

      const email = user.email;
      const password = values.current_password;
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      user
        .reauthenticateWithCredential(credential)
        .then(function () {
          user
            .updatePassword(values.new_password)
            .then(function () {
              setAlert({ status: 'success', message: 'Cap nhat mat khau thanh cong' });
              auth.signOut();
              window.location.replace('/login');
            })
            .catch(function (error) {
              setAlert({ status: 'danger', message: error.mess });
            });
        })
        .catch(function (error) {
          setAlert({ status: 'danger', message: error });
        });
    },
    [setAlert],
  );

  const validationSchema = Yup.object({
    current_password: Yup.string().required('Day la truong bat buoc'),
    new_password: Yup.string()
      .required('Day la truong bat buoc')
      .trim()
      .max(255, 'Nhap khong qua 255 ki tu')
      .test('check_confirm_mail', 'Nhap mat khau moi khong trung khop', function required(new_password) {
        const { confirm_password } = this.parent;
        return confirm_password === new_password;
      }),
    confirm_password: Yup.string()
      .required('Day la truong bat buoc')
      .trim()
      .max(255, 'Nhap khong qua 255 ki tu')
      .test('check_confirm_mail', 'Nhap mat khau moi khong trung khop', function required(confirm_password) {
        const { new_password } = this.parent;
        return confirm_password === new_password;
      }),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleChangePassWord}
      initialValues={{
        current_password: '',
        new_password: '',
        confirm_password: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Modal show onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thay doi mat khau</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form noValidate onSubmit={handleSubmit}>
                {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}

                <Form.Row>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Mat khau hien tai</Form.Label>
                    <Form.Control
                      type="password"
                      name="current_password"
                      value={values.current_password}
                      onChange={handleChange}
                      isInvalid={touched.current_password && !!errors.current_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.current_password}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Nhap mat khau moi</Form.Label>
                    <Form.Control
                      type="password"
                      name="new_password"
                      value={values.new_password}
                      onChange={handleChange}
                      isInvalid={touched.new_password && !!errors.new_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.new_password}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Xac nhan lai mat khau</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      isInvalid={touched.confirm_password && !!errors.confirm_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={onClose}>
              Huy bo
            </Button>
            <Button
              type="submit"
              variant="primary"
              onkeypress={() => {
                handleSubmit();
                onClose();
              }}
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Luu lai thay doi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ModalChangePassword;
