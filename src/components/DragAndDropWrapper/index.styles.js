import styled from 'styled-components';

const Wrapper = styled.div`
  .dropzone {
    border: 1px dashed blue;
    padding: 50px;
  }
  .thumbs-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .thumb {
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 200px;
    height: 200px;
    padding: 4px;
    box-sizing: border-box;
  }

  .thumb-inner {
    display: flex;
    min-width: 0px;
    overflow: hidden;
    position: relative;
  }

  img {
    display: block;
    width: auto;
    height: 100%;
  }

  .img-item {
    position: relative;
  }

  .btn-close {
    position: absolute;
    stroke: #707070;
    width: 25px;
    height: 25px;
    fill: #fff;
    stroke-width: 1px;
    right: -1px;
    cursor: pointer;
  }
`;
export default Wrapper;
