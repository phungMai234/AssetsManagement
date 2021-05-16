import React, { useMemo } from 'react';

import { useQuery } from 'hooks/useQuery';
import DeliveryReportContext from './Context';

const Provider = ({ children }) => {
  const { data: orders, loading: loadingOrders } = useQuery({ url: 'orders' });
  const { data: devices, loading: loadingDevices } = useQuery({ url: 'assets' });

  const restructureData = useMemo(() => {
    if (loadingOrders || loadingDevices) {
      return [];
    }

    if (!orders.length || !devices.length) {
      return [];
    }
    const data = orders.map((order) => {
      const { orderDetails } = order;

      const listOrder = orderDetails.map((e) => {
        const item = devices.find((device) => device.id === e.id);
        return { ...item, ...e };
      });
      delete order.orderDetails;
      return { ...order, order_details: [...listOrder] };
    });

    return data;
  }, [devices, loadingDevices, loadingOrders, orders]);

  return (
    <DeliveryReportContext.Provider
      value={{
        data: restructureData,
        loading: loadingOrders || loadingDevices,
      }}
    >
      {children}
    </DeliveryReportContext.Provider>
  );
};

export default Provider;
