import React from 'react';

import { Link } from 'react-router-dom';
import { FileText, Home, Database, User } from 'react-feather';

import './menu.css';

function Menu() {
  const activeRoute = window.location.pathname;

  return (
    <ul className="nav flex-column nav-pills nav-fill nav-menu">
      <li className="nav-item">
        <Link
          className={`nav-link ${activeRoute.match(/\/dashboard\/lectures/) ? 'active' : ''}`}
          to={'/dashboard/lectures'}
        >
          <User size={20} />
          <span>Quản lý danh sách cán bộ</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${activeRoute.match(/\/dashboard\/categories/) ? 'active' : ''}`}
          to={'/dashboard/categories'}
        >
          <Home size={20} />
          <span>Quản lý các loại tài sản</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${activeRoute.match(/\/dashboard\/assets/) ? 'active' : ''}`}
          to={'/dashboard/assets'}
        >
          <Database size={20} />
          <span>Quản lý tài sản</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${activeRoute.match(/\/dashboard\/delivery_reports/) ? 'active' : ''}`}
          to={'/dashboard/delivery_reports'}
        >
          <FileText size={20} />
          <span>Quản lý biên bản bàn giao</span>
        </Link>
      </li>
    </ul>
  );
}
export default Menu;
