import { useState, useEffect, useCallback } from 'react';

import db from '../database';

export const useQuery = ({ url, ignoreCancel = false }) => {
  const [dataOrders, setDataOrders] = useState([]);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);

  useEffect(() => {
    setLoading(true);

    db.collection('orders').onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setDataOrders(result);
      setErrors(null);
    });

    db.collection('orderDetails').onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setDataOrderDetail(result);
      setErrors(null);
    });

    db.collection('devices').onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      setDevices(result);
      setErrors(null);
      setLoading(false);
    });
  }, [url, forceRequest, ignoreCancel]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};
