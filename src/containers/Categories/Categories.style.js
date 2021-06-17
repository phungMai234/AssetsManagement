import styled from 'styled-components';

const Wrapper = styled.div`
  .header-content {
    display: flex;
    align-items: center;
  }
  table {
    table-layout: fixed;
    .index {
      width: 5%;
    }
    .name {
      width: 20%;
    }
    .manager {
      width: 20%;
    }
    .note {
      width: 20%;
    }
    .edit_row {
      width: 13%;
    }
    .delete_row {
      width: 7%;
    }
    .td-delete_row,
    .td-edit_row {
      text-align: center;
    }
    .no-result {
      text-align: center;
    }
  }
  td {
    vertical-align: middle;
  }
  .td-note {
    div {
      display: -webkit-box;
      max-width: 400px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
export default Wrapper;
