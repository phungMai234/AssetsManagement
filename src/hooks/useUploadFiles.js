'use strict';

import { useCallback, useState } from 'react';

import { useField } from 'formik';
import { storage } from 'database';
import useAlert from 'hooks/useAlert';

export default function useUploadFiles({ name, setSubmitting }) {
  const [{ value }, , { setValue }] = useField({ name });
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const uploadFile = useCallback(
    (file) => {
      setLoading(true);
      setSubmitting(true);
      var metadata = {
        contentType: 'application/pdf',
      };

      const storageRef = storage.ref();

      var uploadTask = storageRef.child('files/' + file.name).put(file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          !!error && setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setValue([...value, { name: file.name, url: downloadURL }]);
            setLoading(false);
            setSubmitting(false);
          });
        },
      );
    },
    [setAlert, setSubmitting, setValue, value],
  );

  return [uploadFile, { loading }];
}
