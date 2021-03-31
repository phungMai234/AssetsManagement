import React, { useState } from 'react';

import { Carousel } from 'react-bootstrap';
import { ChevronRight, ChevronLeft } from 'react-feather';
import styled from 'styled-components';

import PhotoPreview from 'components/PhotoPreview';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  .carousel-control-prev {
    left: -50px;
  }

  .carousel-control-next {
    right: -50px;
  }

  .image-item {
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .carousel.slide,
  .carousel-inner,
  .carousel-item {
    height: 100%;
  }

  .carousel-inner {
    & > .active {
      background-color: #f2f2f2 !important;
      border: 1px solid #f2f2f2;
    }
  }
  .carousel-indicators {
    bottom: -38px;

    li {
      width: 10px;
      height: 10px;
      border: 1px solid #333;
      border-radius: 50%;
    }
  }
`;

const PhotoSlider = ({ data = [], isPreview = false, ...restProps }) => {
  const [preview, setPreview] = useState(null);

  return (
    <Wrapper>
      <Carousel
        nextIcon={<ChevronRight color="#707070" size={35} />}
        prevIcon={<ChevronLeft color="#707070" size={35} />}
        indicators={data.length > 1}
        controls={data.length > 1}
        {...restProps}
      >
        {data.map((photo, index) => (
          <Carousel.Item key={index}>
            <div
              className="image-item"
              style={{
                backgroundImage: `url('${photo.preview}')`,
              }}
              onClick={() => isPreview && setPreview(index)}
            ></div>
          </Carousel.Item>
        ))}
        {isPreview && preview !== null && (
          <PhotoPreview images={data} index={preview} onClose={() => setPreview(null)} />
        )}
      </Carousel>
    </Wrapper>
  );
};

export default PhotoSlider;
