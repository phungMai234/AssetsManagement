import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';

import './LayoutPage.css';
import Header from '../header/header';
import Menu from '../menu/menu';

function LayoutPage({ children }) {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidenav">
        <Menu />
      </div>
      <div className="content">
        <main>{children}</main>
      </div>
    </div>
  );
}

export default LayoutPage;
