import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import { FileText } from 'react-feather';

function Menu() {
  const activeRoute = window.location.pathname;

  return (
    <ul className="nav flex-column nav-menu">
      <li className="nav-item">
        <Link
          className={`nav-link ${activeRoute.match(/\/dashboard\/categories/) ? 'active' : ''}`}
          to={'/dashboard/categories'}
        >
          <i className="nav-item-icon fas fa-home"></i>
          <span>Quản lý các loại tài sản</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeRoute.match(/\/dashboard\/item/) ? 'active' : ''}`} to={'/dashboard/item'}>
          <FileText size={20} />
          <span>Quản lý các thiết bị, đồ dùng</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeRoute.match(/\/dashboard\/report/) ? 'active' : ''}`} to={'/dashboard/item'}>
          {/* <i className="nav-item-icon fas fa-desktop"></i> */}
          <FileText size={20} />
          <span>Quản lý biên bản, giao nhận</span>
        </Link>
      </li>
    </ul>
  );
}
export default Menu;
