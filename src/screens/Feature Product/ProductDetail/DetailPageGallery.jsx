import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s1 from '../../../media/images/s1.png'
import s2 from '../../../media/images/s2.png'
import s3 from '../../../media/images/s3.png'
import s4 from '../../../media/images/s4.png'
import s5 from '../../../media/images/s5.png'
import s6 from '../../../media/images/s6.png'
import heart from '../../../media/images/heartsss.png'
import share from '../../../media/images/material-symbols_share-outline.png'

const DetailPageGallery = () => {
  const images = [
    s3,
    s2,
    s1,
    s4,
    s5,
    s6
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Thumbnail Section */}
        <div className="col-md-2 d-flex flex-column">
          {images.map((img, index) => (
            <div
              key={index}
              className={`mb-2 p-1 border ${selectedImage === img ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="img-fluid"
                style={{ height: "75px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {/* Main Image Section */}
        <div className="col-md-10 d-flex justify-content-center align-items-center position-relative">
          <img src={selectedImage} alt="Selected" className="img-fluid border" style={{ width: "100%" , height:"530px"}}  />
          <div className="hearts-image">
            <img src={heart} />
          </div>
          <div className="share-image">
            <img src={share} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageGallery;
