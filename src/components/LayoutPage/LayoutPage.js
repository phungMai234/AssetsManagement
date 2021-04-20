import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';

import Header from '../header/header';
import Menu from '../menu/menu';
import MessageRes from 'components/MessageRes';

import { Row, Col } from 'react-bootstrap';
import useAlert from 'hooks/useAlert';
import Wrapper from './LayoutPage.styles';

function LayoutPage({ children }) {
  const { alert, clearAlert } = useAlert();

  return (
    <Wrapper>
      <div className="header">
        <Header />
      </div>
      <Row>
        <Col md={3} className="sidenav">
          <Menu />
        </Col>
        <Col md={9} className="content">
          <main>
            <Row>
              <Col md={12}>
                {!!alert && <MessageRes content={alert.message} status={alert.status} onHide={clearAlert} />}
              </Col>
            </Row>
            {children}
          </main>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default LayoutPage;
