import React from 'react';

import { render } from '@testing-library/react';

import BreadCrumb from '../BreadCrumb';

test('should render correctly', () => {
  const container = render(
    <BreadCrumb
      breadcrumb={[
        {
          url: '/dashboard/delivery_reports',
          title: 'Danh sách biên bản',
        },
        {
          url: '',
          title: 'Tạo mới',
        },
      ]}
    />,
  );
  expect(container.container).toMatchSnapshot();
});
