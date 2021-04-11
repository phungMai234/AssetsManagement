import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useGetDetailReport = ({ id, ignoreCancel = false }) => {
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [dataDevice, setDataDevice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    let cloneDataOrder = [];
    let cloneDataDevice = [];

    db.collection('orderDetails')
      .where('id_order', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cloneDataOrder.push({ id: doc.id, ...doc.data() });

          db.collection('devices')
            .doc(doc.data().id_device)
            .onSnapshot((querySnapshot) => {
              cloneDataDevice.push({ id_device: querySnapshot.id, ...querySnapshot.data() });
              setDataDevice(cloneDataDevice);
            });
        });
        setDataOrderDetail(cloneDataOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [forceRequest, ignoreCancel, id]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, dataOrderDetail, dataDevice, force };
};
