import React from 'react';

import LayoutPage from 'components/LayoutPage';
import CategoriesPage from 'containers/Categories';
import LecturesManagementListPage, { DetailLecturers } from 'containers/LecturesManagement';
import { ItemListPage, ItemDetailPage, ItemNewPage, ItemEditPage } from 'containers/Item';
import {
  DeliveryReportsListPage,
  DeliveryReportsDetailPage,
  DeliveryReportsEditPage,
  DeliveryReportsNewPage,
} from 'containers/DeliveryReports';
import Login from 'containers/Login';
import PasswordReset from 'containers/PasswordReset';
import HomePage from 'containers/HomePage';
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
    path: '/dashboard/manual',
    component: (
      <LayoutPage>
        <HomePage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/lectures',
    component: (
      <LayoutPage>
        <LecturesManagementListPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/lectures/:id/detail',
    component: (
      <LayoutPage>
        <DetailLecturers />
      </LayoutPage>
    ),
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
    path: '/dashboard/assets',
    component: (
      <LayoutPage>
        <ItemListPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/assets/new',
    component: (
      <LayoutPage>
        <ItemNewPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/assets/:id/detail',
    component: (
      <LayoutPage>
        <ItemDetailPage />
      </LayoutPage>
    ),
    exact: true,
    authentication: false,
  },
  {
    path: '/dashboard/assets/:id/edit',
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
      <DeliveryReportContextProvider>
        <LayoutPage>
          <DeliveryReportsEditPage />
        </LayoutPage>
      </DeliveryReportContextProvider>
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
