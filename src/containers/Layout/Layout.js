import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Menu from './Menu';

const Wrapper = styled.div`
  .header {
    position: relative;
    height: 100px;
    top: 0;
    left: 0;
    right: 0;
  }

  .menu {
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 200px;
  }
  .content {
    position: absolute;
    top: 100px;
    left: 200px;
    right: 0;
    bottom: 0;
  }
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Menu />

      <div className="content">{children}</div>
    </Wrapper>
  );
};

export default Layout;
