import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';

import './LayoutPage.css';
import Header from '../header/header';
import Menu from '../menu/menu';
import MessageRes from 'components/MessageRes';

import { Row, Col } from 'react-bootstrap';
import useAlert from 'hooks/useAlert';
import './LayoutPage.styles';

function LayoutPage({ children }) {
  const { alert, clearAlert } = useAlert();

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidenav">
        <Menu />
      </div>
      <div className="content">
        <main>
          <Row>
            <Col md={12}>
              {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}
            </Col>
          </Row>
          {children}
        </main>
      </div>
    </div>
  );
}

export default LayoutPage;
