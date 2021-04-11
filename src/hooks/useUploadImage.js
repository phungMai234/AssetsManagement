import { useCallback } from 'react';

import { storage } from 'database';
import { useField } from 'formik';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const useUploadImage = (name) => {
  const [{ value = [] }, , { setValue }] = useField({ name });
  const { setAlert } = useAlert();

  const uploadImage = useCallback(
    (file) => {
      let metadata = {
        contentType: 'image/jpeg',
      };

      const storageRef = storage.ref();

      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          !!error && setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại' });
          focusOnTop();
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setValue([...value, { path: file.name, preview: downloadURL }]);
          });
        },
      );
    },
    [setAlert, setValue, value],
  );

  return [uploadImage];
};

export default useUploadImage;
