import React from 'react';

import LayoutPage from 'components/LayoutPage';
import CategoriesPage from 'containers/Categories';
import { ItemListPage, ItemDetailPage, ItemNewPage, ItemEditPage } from 'containers/Item';
import {
  DeliveryReportsListPage,
  DeliveryReportsDetailPage,
  DeliveryReportsEditPage,
  DeliveryReportsNewPage,
} from 'containers/DeliveryReports';
import Login from 'containers/Login';

import { DeliveryReportContextProvider } from 'contexts/DeliveryReportContext';

export default [
  {
    path: '/login',
    component: <Login />,
    exact: true,
  },
  {
    path: '/dashboard/categories',
    component: (
      <LayoutPage>
        <CategoriesPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/devices',
    component: (
      <LayoutPage>
        <ItemListPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/devices/new',
    component: (
      <LayoutPage>
        <ItemNewPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/devices/:id/detail',
    component: (
      <LayoutPage>
        <ItemDetailPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/devices/:id/edit',
    component: (
      <LayoutPage>
        <ItemEditPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/delivery_reports',
    component: (
      <LayoutPage>
        <DeliveryReportsListPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/delivery_reports/:id/detail',
    component: (
      <DeliveryReportContextProvider>
        <LayoutPage>
          <DeliveryReportsDetailPage />
        </LayoutPage>
      </DeliveryReportContextProvider>
    ),
    exact: true,
  },
  {
    path: '/dashboard/delivery_reports/:id/edit',
    component: (
      <LayoutPage>
        <DeliveryReportsEditPage />
      </LayoutPage>
    ),
    exact: true,
  },
  {
    path: '/dashboard/delivery_reports/new',
    component: (
      <LayoutPage>
        <DeliveryReportsNewPage />
      </LayoutPage>
    ),
    exact: true,
  },
];
