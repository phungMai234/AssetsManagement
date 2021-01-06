import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';

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
          <span>Quản lý các loại đồ dùng</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeRoute.match(/\/dashboard\/item/) ? 'active' : ''}`} to={'/dashboard/item'}>
          <i className="nav-item-icon fas fa-desktop"></i>
          <span>Quản lý các đồ dùng</span>
        </Link>
      </li>
    </ul>
  );
}
export default Menu;
