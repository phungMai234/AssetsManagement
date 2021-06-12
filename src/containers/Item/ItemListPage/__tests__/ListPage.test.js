import React from 'react';

import { render, findByText } from '@testing-library/react';

import ListPage from '../ItemList';
import { useQuery } from 'hooks/useQuery';
import { useQueryAssets } from 'hooks/useQueryAssets';

jest.mock('hooks/useQuery');
jest.mock('hooks/useQueryAssets');

describe('Item Edit Page', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loadingCates: false,
      dataCate: {
        data: [
          {
            id: '1',
            name: 'test',
            note: '',
            manager: 'Khoa công nghệ thông tin ',
          },
        ],
      },
    });
    useQueryAssets.mockReturnValue({
      loadingItems: false,
      dataItems: {
        data: [
          {
            name: 'Bàn phím Logitech K380',
            model_number: 'BPK380',
            serial_number: 'BPK380-003',
            id_category: 'fUACg168JQUzgSVI9DD3',
            status: 'Đang sử dụng',
            unit: 'cái',
            price_each: 560000,
            current_status: 'Tốt',
            purchase_date: {
              seconds: 1622030400,
              nanoseconds: 0,
            },
            image_detail: [
              {
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/assets…=media&token=7e31dc76-25ee-4a02-a027-5db0470bd09e',
                path: 'bp3.png',
              },
            ],
            description: ' Bàn phím Logitech K380 không dây-Kết nối cùng lúc 3 thiết bị',
          },
        ],
      },
    });
  });

  it('should render correctly', () => {
    const container = render(<ListPage />);
    expect(container.container).toMatchSnapshot();
  });

  it('should render correctly with loading', () => {
    useQueryAssets.mockReturnValue({
      loadingItems: true,
      dataItems: {},
    });
    const wrapper = render(<ListPage />);
    const textLoading = wrapper.findByText('Loading...');
    expect(textLoading).toBeTruthy();
    expect(wrapper.container).toMatchSnapshot();
  });
});
