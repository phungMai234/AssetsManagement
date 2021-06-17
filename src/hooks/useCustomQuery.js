import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useCustomQuery = ({ url, name, ignoreCancel = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection(url)
      .where('user_name', '==', name)
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result = [...result, { id: doc.id, ...doc.data() }];
        });
        setData(result);
        setErrors(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [url, forceRequest, ignoreCancel, name]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
