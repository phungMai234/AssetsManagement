import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#bfbfbf';
};

const CustomDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  height: 150px;
  transition: border 0.24s ease-in-out;

  .placeholder {
    text-align: center;
    color: #38b1b0;
  }
`;
export default styled.div`
  .thumbs-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .thumb-loading {
    width: 200px;
    height: 200px;
    border: 1px solid #eaeaea;
    background-color: #eaeaea;
  }
  .thumb {
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    margin-top: 20px;
    margin-right: 20px;
    width: 200px;
    height: 200px;
    padding: 4px;
    box-sizing: border-box;
    position: relative;
  }

  .thumb-inner {
    display: flex;
    min-width: 0px;
    overflow: hidden;
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
    stroke-width: 2px;
    right: 3px;
    top: 3px;
    cursor: pointer;
  }

  .help-text {
    color: #ff1744;
  }
`;

export { CustomDropzone };
