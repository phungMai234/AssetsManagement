import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from '../menu';

describe('Menu', () => {
  it('should render correctly', () => {
    const container = render(
      <Router>
        <Menu />
      </Router>,
    );
    expect(container.container).toMatchSnapshot();
  });
});
