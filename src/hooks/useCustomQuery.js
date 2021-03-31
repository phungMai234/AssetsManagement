import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useCustomQuery = ({ url, id, ignoreCancel = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  console.log('url: ', url, 'id: ', id);
  useEffect(() => {
    setLoading(true);

    db.collection(url)
      .where('id_order', '==', id)
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result = [...result, { id: doc.id, ...doc.data() }];
        });
        console.log('result: ', result);
        setData(result);
        setErrors(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [url, forceRequest, ignoreCancel, id]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
