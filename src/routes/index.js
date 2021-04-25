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
import PasswordReset from 'containers/PasswordReset';

import { DeliveryReportContextProvider } from 'contexts/DeliveryReportContext';

export default [
  {
    path: '/auth/login',
    component: <Login />,
    exact: true,
    authentication: false,
  },
  {
    path: '/auth/password_reset',
    component: <PasswordReset />,
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/categories',
    component: (
      <LayoutPage>
        <CategoriesPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/devices',
    component: (
      <LayoutPage>
        <ItemListPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/devices/new',
    component: (
      <LayoutPage>
        <ItemNewPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/devices/:id/detail',
    component: (
      <LayoutPage>
        <ItemDetailPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/devices/:id/edit',
    component: (
      <LayoutPage>
        <ItemEditPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/delivery_reports',
    component: (
      <LayoutPage>
        <DeliveryReportsListPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
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
    authentication: false,
  },
  {
    path: '/dashboard/delivery_reports/:id/edit',
    component: (
      <LayoutPage>
        <DeliveryReportsEditPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/delivery_reports/new',
    component: (
      <LayoutPage>
        <DeliveryReportsNewPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
];
