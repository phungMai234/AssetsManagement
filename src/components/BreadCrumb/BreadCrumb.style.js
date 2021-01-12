import styled from 'styled-components';

export default styled.nav`
  .breadcrumb {
    background: #fff;
    padding: 0 !important;
    margin: 0;
    margin-top: 0px;

    .breadcrumb-item {
      a {
        color: #707070;
        font-weight: 300;
        text-decoration: none;

        &.active {
          color: #007bff;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .breadcrumb-item + .breadcrumb-item::before {
      content: '>';
    }
  }
  h3 {
    font-weight: 300 !important;
  }
`;
