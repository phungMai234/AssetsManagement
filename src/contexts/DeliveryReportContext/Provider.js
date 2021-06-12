import React, { useMemo } from 'react';

import { useQuery } from 'hooks/useQuery';
import DeliveryReportContext from './Context';
import { mergeParentToChild, mergeChildToParent } from 'utils/restructureData';

const Provider = ({ children }) => {
  const { data: orders, loading: loadingOrders } = useQuery({ url: 'orders' });
  const { data: orderDetails, loading: loadingOrderDetail } = useQuery({ url: 'orderDetails' });
  const { data: devices, loading: loadingDevices } = useQuery({ url: 'devices' });

  const restructureData = useMemo(() => {
    if (loadingOrders || loadingOrderDetail || loadingDevices) {
      return [];
    }

    if (!orders.length || !orderDetails.length || !devices.length) {
      return [];
    }

    let data = mergeParentToChild({
      parents: orderDetails,
      childs: devices,
      parentKey: 'id_device',
      childKey: 'id',
    });

    data = mergeChildToParent({
      parents: orders,
      childs: data,
      parentKey: 'id',
      childKey: 'id_order',
      childName: 'order_details',
    });

    return data;
  }, [devices, loadingDevices, loadingOrderDetail, loadingOrders, orderDetails, orders]);

  return (
    <DeliveryReportContext.Provider
      value={{
        data: restructureData,
        loading: loadingOrders || loadingOrderDetail || loadingDevices,
      }}
    >
      {children}
    </DeliveryReportContext.Provider>
  );
};

export default Provider;
