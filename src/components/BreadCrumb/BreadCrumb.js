import React from 'react';
import BreadcrumbWrapper from './BreadCrumb.style';

const BreadCrumb = ({ breadcrumb }) => {
  return (
    <BreadcrumbWrapper>
      <ul className="breadcrumb">
        {breadcrumb.map((link, index) => {
          const isLastItem = index === breadcrumb.length - 1;
          const href = link.url && !isLastItem ? { href: link.url } : {};
          return (
            <li className="breadcrumb-item" aria-current="page" key={link.url + index}>
              <a {...href} className={`${isLastItem ? 'active-tab' : ''}`}>
                {link.title}
              </a>
            </li>
          );
        })}
      </ul>
    </BreadcrumbWrapper>
  );
};
export default BreadCrumb;
