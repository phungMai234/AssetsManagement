import React, { useState } from 'react';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const PhotoPreview = ({ images, onClose }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div>
      <Lightbox
        mainSrc={images[photoIndex].preview}
        nextSrc={images[(photoIndex + 1) % images.length].preview}
        prevSrc={images[(photoIndex + images.length - 1) % images.length].preview}
        onCloseRequest={onClose}
        onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
      />
    </div>
  );
};

export default PhotoPreview;
