import React, { useCallback, useState } from 'react';
import BaseModal from 'components/BaseModal';
import db, { firebase } from 'database';

import styled from 'styled-components';
import useAlert from 'hooks/useAlert';
import { FREE } from 'utils/constant';

const Wrapper = styled.div`
  .error {
    color: #000;
    font-size: 14px;
  }

  .help {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    font-style: italic;
  }
`;
const ModalImportFile = ({ data, onCancel, force }) => {
  const [number, setNumber] = useState();
  const [errors, setErrors] = useState();

  const { setAlert } = useAlert();

  const handleRandomSeri = useCallback(() => {
    let countNumber = 0;
    let listSeri = [];
    while (countNumber < number) {
      const serial_number = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 10);
      listSeri.push(serial_number);
      countNumber++;
    }
    delete data?.seri_list;

    listSeri.map((seri) => {
      let formatValues = {
        ...data,
        status: FREE,
        purchase_date: firebase.firestore.Timestamp.fromDate(new Date()),
        serial_number: seri,
      };

      db.collection('assets')
        .add({ ...formatValues })
        .then(() => {})
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        })
        .finally(() => {});
    });
    setAlert({ status: 'success', message: 'Tạo mới thành công' });
    force();
    onCancel();
  }, [data, force, number, onCancel, setAlert]);

  return (
    <BaseModal
      show={true}
      title={`${data?.model_number} - ${data?.name}`}
      confirmText="Tạo"
      cancelText="Hủy bỏ"
      disableBtnConfirm={!!errors && !!errors.length}
      content={
        <Wrapper>
          <div>Nhâp số lượng tài sản:</div>
          <input type="input" value={number} onChange={(e) => setNumber(e.target.value)} />
        </Wrapper>
      }
      onCancel={() => onCancel()}
      onConfirm={handleRandomSeri}
      typeBtnConfirm="success"
    />
  );
};

export default ModalImportFile;
