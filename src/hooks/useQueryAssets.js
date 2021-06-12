import { useState, useEffect, useCallback } from 'react';

import db from 'database';

export const useQueryAssets = ({ ignoreCancel = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection('assets')
      .orderBy('model_number', 'asc')
      .onSnapshot((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setData(result);
        setErrors(null);
        setLoading(false);
      });
  }, [forceRequest, ignoreCancel]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
