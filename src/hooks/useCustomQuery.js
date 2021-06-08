import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useCustomQuery = ({ name, ignoreCancel = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection('orders')
      .where('user_name.label', '==', name)
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
  }, [forceRequest, ignoreCancel, name]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
