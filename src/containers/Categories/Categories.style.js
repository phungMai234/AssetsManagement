import styled from 'styled-components';

const Wrapper = styled.div`
  .header-content {
    display: flex;
    align-items: center;
  }
  table {
    table-layout: fixed;
    .index {
      width: 10%;
    }
    .name {
      width: 20%;
    }
    .manager {
      width: 20%;
    }
    .note {
      width: 30%;
    }
    .edit_row,
    .delete_row {
      width: 10%;
    }
  }
  td {
    vertical-align: middle;
  }
  .td-note {
    /* div {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    } */

    .memo p {
      word-wrap: break-word;
      margin: 0;
      font-size: 14px;
    }

    .line-clamp {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;
export default Wrapper;
