import React, { useCallback } from 'react';

import { Modal, Button, Form, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MessageRes from 'components/MessageRes';
import useAlert from 'hooks/useAlert';
import { firebase, auth } from 'database';
import Label from 'components/Label';

const ModalChangePassword = ({ onClose }) => {
  const { alert, setAlert, clearAlert } = useAlert();
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
              setAlert({ status: 'danger', message: error.message });
            });
        })
        .catch(function (error) {
          setAlert({ status: 'danger', message: error.message });
        });
    },
    [setAlert],
  );

  const validationSchema = Yup.object({
    current_password: Yup.string().required('Đây là trường bắt buộc '),
    new_password: Yup.string()
      .required('Đây là trường bắt buộc ')
      .trim()
      .max(255, 'Nhập không quá 255 kí tự')
      .test('check valid password', 'Mật khẩu mới không trùng khớp', function required(new_password) {
        const { confirm_password } = this.parent;
        return confirm_password === new_password;
      })
      .test('check_confirm_mail', 'Mật khẩu mới không trùng khớp', function required(new_password) {
        const { confirm_password } = this.parent;
        return confirm_password === new_password;
      }),
    confirm_password: Yup.string()
      .required('Đây là trường bắt buộc ')
      .trim()
      .max(255, 'Nhập không quá 255 kí tự')
      .test('check_confirm_mail', 'Mật khẩu mới không trùng khớp', function required(confirm_password) {
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
            <Modal.Title>Thay đổi mật khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form noValidate onSubmit={handleSubmit}>
                {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}

                <Form.Row>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>
                      <Label isRequired>Mật khẩu hiện tại</Label>
                    </Form.Label>
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
                    <Form.Label>
                      <Label isRequired>Nhập mật khẩu mới</Label>
                    </Form.Label>
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
                    <Form.Label>
                      <Label isRequired>Xác nhận lại mật khẩu</Label>
                    </Form.Label>
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
            <Button type="button" size="sm" variant="secondary" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Lưu lại thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ModalChangePassword;
