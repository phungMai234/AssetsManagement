import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

const WrapperModal = styled(Modal)`
  .error {
    color: red;
    font-size: 14px;
  }

  .btn-close {
    position: absolute;
    top: 0px;
    right: 13px;
    cursor: pointer;
  }
`;
export default WrapperModal;
