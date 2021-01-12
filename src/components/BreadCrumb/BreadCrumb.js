import React from 'react';
import { useCurrentRoute } from 'react-navi';
import BreadcrumbWrapper from './BreadCrumb.style';

const BreadCrumb = () => {
  const {
    data: { breadcrumb },
  } = useCurrentRoute();
  if (!breadcrumb) {
    return null;
  }
  return (
    <BreadcrumbWrapper>
      <ul className="breadcrumb">
        {breadcrumb.map((link, index) => {
          const isLastItem = index === breadcrumb.length - 1;
          const href = link.url && !isLastItem ? { href: link.url } : {};
          return (
            <li
              className="breadcrumb-item"
              aria-current="page"
              key={link.url + index}
            >
              <a {...href} className={`${isLastItem ? 'active' : ''}`}>
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
