import React from 'react';

import { render } from '@testing-library/react';

import Loading from '../Loading';

test('should render correctly', () => {
  const container = render(<Loading />);
  expect(container.container).toMatchSnapshot();
});
