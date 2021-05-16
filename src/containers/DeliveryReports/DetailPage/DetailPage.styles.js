import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
    }

    .td-name {
      a {
        display: flex;
        align-items: center;
      }
    }
  }

  .item-file {
    margin-bottom: 5px;

    span {
      margin-left: 5px;
    }
  }

  .title {
    margin-bottom: 30px;
    margin-top: 20px;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .default_title {
      font-size: 16px;
    }

    .item-value {
      font-size: 16px;
      white-space: break-spaces;
    }
  }

  .group-btn-action {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .btn-edit {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .btn-print {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .image-slider {
    height: 400px;
    width: 400px;
  }

  textarea {
    padding: 10px;
    box-sizing: border-box;
    color: #707070;
    width: 100%;
    border-radius: 3px;
    background: #f5f5f5;
    border: 1px solid #b9b9b9;
    font-size: 15px;
    -webkit-appearance: none;
    color: #707070;
    @media (max-width: 768px) {
      margin-left: 0;
    }
    &:focus {
      outline: none;
      border-color: unset;
      box-shadow: none;
    }
  }

  .detail-memo {
    border: none !important;
    resize: none;
  }
`;
export default Wrapper;
