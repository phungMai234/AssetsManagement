import React from 'react';

import { render } from '@testing-library/react';

import Label from '../index';

test('should render correctly', () => {
  const container = render(<Label />);
  expect(container.container).toMatchSnapshot();
});

test('should render correctly with required', () => {
  const container = render(<Label isRequired />);
  expect(container.container).toMatchSnapshot();
});
