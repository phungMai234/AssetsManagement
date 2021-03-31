import styled from 'styled-components';

export default styled.nav`
  .breadcrumb {
    background-color: #fff;
    padding: 0 !important;
    margin: 0;
    margin-top: 0px;

    .breadcrumb-item {
      a {
        color: #707070;
        font-weight: 300;
        text-decoration: none;
        background-color: #fff;

        &.active-tab {
          color: #007bff;

          &:hover {
            text-decoration: none;
          }
        }

        &:hover {
          text-decoration: underline;
          background-color: #fff;
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
