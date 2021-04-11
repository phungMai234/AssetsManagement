import { useCallback } from 'react';

import { storage } from 'database';
import { useField } from 'formik';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const useDeleteFile = (name) => {
  const [{ value = [] }, , { setValue }] = useField({ name });
  const { setAlert } = useAlert();

  const deleteFile = useCallback(
    (file) => {
      const storageRef = storage.ref();
      let desertRef = storageRef.child('files/' + file.name);

      desertRef
        .delete()
        .then(() => {
          const filterValue = value.filter((item) => item.name !== file.name);
          setValue(filterValue);
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại' });
          focusOnTop();
        });
    },
    [setAlert, setValue, value],
  );

  return [deleteFile];
};

export default useDeleteFile;
