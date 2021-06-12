import React from 'react';

import { render } from '@testing-library/react';

import StatusBorrow from '../StatusBorrow';

describe('StatusBorrow', () => {
  it('should render correctly', () => {
    const container = render(<StatusBorrow />);
    expect(container.container).toMatchSnapshot();
  });

  it('should render correctly with status draft', () => {
    const container = render(<StatusBorrow status="draft" />);
    expect(container.container).toMatchSnapshot();
  });

  it('should render correctly with status borrowing', () => {
    const container = render(<StatusBorrow status="borrowing" />);
    expect(container.container).toMatchSnapshot();
  });

  it('should render correctly with status closed', () => {
    const container = render(<StatusBorrow status="closed" />);
    expect(container.container).toMatchSnapshot();
  });
});
