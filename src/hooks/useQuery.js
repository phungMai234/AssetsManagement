import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useQuery = ({ url, ignoreCancel = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection(url).onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setData(result);
      setErrors(null);
      setLoading(false);
    });
  }, [url, forceRequest, ignoreCancel]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
