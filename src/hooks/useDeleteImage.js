import { useCallback } from 'react';

import { storage } from 'database';
import { useField } from 'formik';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const useDeleteImage = (name) => {
  const [{ value = [] }, , { setValue }] = useField({ name });
  const { setAlert } = useAlert();

  const deleteImage = useCallback(
    (file) => {
      const storageRef = storage.ref();

      let desertRef = storageRef.child('images/' + file.path);

      desertRef
        .delete()
        .then(() => {
          const filterValue = value.filter((item) => item.path !== file.path);
          setValue(filterValue);
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại' });
          focusOnTop();
        });
    },
    [setAlert, setValue, value],
  );

  return [deleteImage];
};

export default useDeleteImage;
