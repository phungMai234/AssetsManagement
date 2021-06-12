import React, { useState, useCallback } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';

import { TYPE_BTN_CANCEL, TYPE_BTN_CONFIRM } from 'utils/constant';
import styled from 'styled-components';
import db from 'database';
import useAlert from 'hooks/useAlert';

const WrapperModal = styled(Modal)`
  .modal-dialog {
    max-width: 800px !important;
  }
  .badge {
    cursor: pointer;
  }
`;
const ModalDetailSeri = ({ data, onCancel, force, ...props }) => {
  const [newData, setNewData] = useState(data?.seri_list || []);
  const [submitting, setSubmitting] = useState(false);
  const { setAlert } = useAlert();

  const handelChangeCurrentStatus = useCallback(
    (id) => {
      const formatData = newData.map((e) => {
        if (e.id === id) {
          return { ...e, current_status: !e.current_status };
        }
        return e;
      });
      setNewData(formatData);
    },
    [newData],
  );

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    newData.map((e) => {
      db.collection('assets')
        .doc(e?.id)
        .update({ ...e })
        .then(() => {})
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        })
        .finally(() => {});
    });
    setSubmitting(false);
    onCancel();
    setAlert({ status: 'success', message: 'Cập nhật thành công' });
    force();
  }, [newData, force, onCancel, setAlert]);

  return (
    <WrapperModal centered onHide={onCancel} show {...props} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{`${data?.model_number} - ${data?.name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Số seri</th>
              <th>Trạng thái</th>
              <th>Ngày mua</th>
              <th>Giá (vnđ)</th>
              <th>Tình trạng hiện tại</th>
            </tr>
          </thead>
          <tbody>
            {!newData ||
              (!newData.length && (
                <tr>
                  <td colSpan={6}>Không có dữ liễu để hiển thị</td>
                </tr>
              ))}
            {!!newData &&
              newData?.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.serial_number}</td>
                  <td>{e.status}</td>
                  <td>{e.purchase_date}</td>
                  <td>{e.price_each}</td>
                  <td>
                    <div onClick={() => handelChangeCurrentStatus(e.id)}>
                      {e.current_status ? <Badge variant="success">Tốt</Badge> : <Badge variant="danger">Hỏng</Badge>}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button size="sm" type="button" variant={TYPE_BTN_CANCEL} disabled={submitting} onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button size="sm" type="button" variant={TYPE_BTN_CONFIRM} disabled={submitting} onClick={handleSubmit}>
          Lưu lại thay đổi
        </Button>
      </Modal.Footer>
    </WrapperModal>
  );
};
export default ModalDetailSeri;
