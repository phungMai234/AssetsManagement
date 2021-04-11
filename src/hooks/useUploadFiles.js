'use strict';

import { useCallback, useState } from 'react';

import { useField } from 'formik';
import { storage } from 'database';

export default function useUploadFiles({ name }) {
  const [{ value }, , { setValue }] = useField({ name });
  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(
    (file) => {
      setLoading(true);
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
          console.log('error: ', error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setValue([...value, { name: file.name, url: downloadURL }]);
            setLoading(false);
          });
        },
      );
    },
    [setValue, value],
  );

  return [uploadFile, { loading }];
}
