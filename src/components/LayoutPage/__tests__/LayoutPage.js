import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import LayoutPage from '../LayoutPage';
import MessageContext from 'contexts/message';

const BaseComponent = ({ ...props }) => (
  <Router>
    <MessageContext.Provider value={{ alert: {}, clearAlert: jest.fn(), setAlert: jest.fn(), ...props }}>
      <LayoutPage />
    </MessageContext.Provider>
  </Router>
);

describe('Layout Page', () => {
  it('should render correctly', () => {
    const container = render(<BaseComponent>hello</BaseComponent>);
    expect(container.container).toMatchSnapshot();
  });
  it('should render correctly with alert message', () => {
    const container = render(<BaseComponent alert={{ message: 'test', status: 'success' }}>hello</BaseComponent>);
    expect(container.container).toMatchSnapshot();
  });
});
