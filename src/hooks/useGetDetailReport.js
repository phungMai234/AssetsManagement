import { useState, useEffect, useCallback } from 'react';

import db from '../database';

const useGetDetailReport = ({ id, ignoreCancel = false }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    let reportData = [];
    let listDevices = [];

    db.collection('orders')
      .doc(id)
      .onSnapshot((querySnapshot1) => {
        reportData.push(querySnapshot1.data());

        db.collection('orderDetails')
          .where('id_order', '==', id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const dataDevices = doc.data();

              db.collection('devices')
                .doc(dataDevices.id_device)
                .onSnapshot((querySnapshot) => {
                  listDevices.push(querySnapshot.data());
                });
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      });
    setData({ fake: reportData, devices: listDevices });
    setLoading(false);
  }, [forceRequest, ignoreCancel, id]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, force };
};

export default useGetDetailReport;
