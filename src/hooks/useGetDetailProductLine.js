import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useGetDetailProductLine = ({ id, ignoreCancel = false }) => {
  const [dataProduct, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    let cloneDataOrder = [];

    db.collection('productlines')
      .where('id_category', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cloneDataOrder.push({ id: doc.id, ...doc.data() });
          setDataProducts(cloneDataOrder);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [forceRequest, ignoreCancel, id]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, dataProduct, force };
};
