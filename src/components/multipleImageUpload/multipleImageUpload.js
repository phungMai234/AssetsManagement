import React, { useState } from 'react';
import './multipleImageUpload.css';
import { Image } from 'react-bootstrap';

const MultipleImageUpload = () => {
  const [urlPhoto, setUrlPhoto] = useState(null);

  const handleChangeImage = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUrlPhoto(url);
  };

  const handleDeletePhoto = () => {
    setUrlPhoto(null);
  };

  return (
    <div className="import-picture">
      {!urlPhoto ? (
        <input type="file" onChange={handleChangeImage} multiple />
      ) : (
        <div className="multi-preview row">
          <Image src={urlPhoto} rounded className="col-sm-8 img-info" />
          <button onClick={handleDeletePhoto} className="col-sm-1 btn-close">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      )}
    </div>
  );
};
export default MultipleImageUpload;
