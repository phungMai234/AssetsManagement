import { useState, useEffect, useCallback } from 'react';

import db from '../database';

const useGetDetail = ({ nameCollection, id, ignoreCancel = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection(nameCollection)
      .doc(id)
      .onSnapshot((querySnapshot) => {
        setData(querySnapshot.data());
        setLoading(false);
      });
  }, [forceRequest, ignoreCancel, nameCollection, id]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, force };
};

export default useGetDetail;
