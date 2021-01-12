import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import WrapperModal from './BaseModal.style';
import {
  TEXT_OK,
  TEXT_CANCEL,
  TYPE_BTN_CONFIRM,
  TYPE_BTN_CANCEL,
} from '../../utils/constant';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  typeModal: PropTypes.string,
  typeBtnConfirm: PropTypes.string,
  typeBtnCancel: PropTypes.string,
};

const BaseModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  typeModal,
  typeBtnConfirm,
  typeBtnCancel,
  ...props
}) => {
  return (
    <WrapperModal
      centered
      onHide={onCancel}
      size={!!typeModal && typeModal}
      {...props}
      backdrop="static"
    >
      {!!title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{content}</Modal.Body>

      <Modal.Footer>
        <Button
          size="sm"
          variant={!!typeBtnCancel ? typeBtnCancel : TYPE_BTN_CANCEL}
          onClick={onCancel}
        >
          {!!cancelText ? cancelText : TEXT_CANCEL}
        </Button>
        <Button
          size="sm"
          variant={!!typeBtnConfirm ? typeBtnConfirm : TYPE_BTN_CONFIRM}
          onClick={onConfirm}
        >
          {!!confirmText ? confirmText : TEXT_OK}
        </Button>
      </Modal.Footer>
    </WrapperModal>
  );
};
BaseModal.propTypes = propTypes;
export default BaseModal;
