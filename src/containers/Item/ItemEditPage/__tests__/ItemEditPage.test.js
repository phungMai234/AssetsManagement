import React from 'react';

import { render, findByText } from '@testing-library/react';

import EditPage from '../ItemListPage';
import useGetDetail from 'hooks/useGetDetail';
import reactRouter from 'react-router-dom';

jest.mock('hooks/useGetDetail');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' }),
  useHistory: jest.fn(),
}));

describe('Item Edit Page', () => {
  test('should render correctly', () => {
    useGetDetail.mockReturnValue({
      loading: false,
      data: {
        data: [
          {
            classroom: { id: 418, name: 'lop0', student_age_range: '0歳児' },
            id: 1,
            name: 'nghia0',
            name_hira: 'てすと',
          },
        ],
      },
    });
    const container = render(<EditPage />);
    expect(container.container).toMatchSnapshot();
  });

  test('should render correctly with loading', () => {
    useGetDetail.mockReturnValue({
      loading: true,
      data: {},
    });
    const wrapper = render(<EditPage />);
    const textLoading = wrapper.findByText('Loading...');
    expect(textLoading).toBeTruthy();
    expect(wrapper.container).toMatchSnapshot();
  });
});
