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
import { productWishlist } from "../../../utils/api";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const DetailPageGallery = ({ id, media }) => {

  const [selectedImage, setSelectedImage] = useState();

  const handleWishlist = async (e) => {
    const data =
    {
      "favourite_against_id": e,
      "type": 1   // 1 for products 
    }

    try {
      const response = await productWishlist(data);
      
      toast.success('Saved Product!');

    } catch (error) {
      toast.error('Something went wrong !', error.message);

      console.error('Error fetching categories:', error);
    }
  }


  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">

        <div className="col-md-2 d-flex flex-column">
          {media?.slice(0, 6).map((img, index) => (
            <div
              key={index}
              className={`mb-2 p-1 border ${selectedImage === img?.original_url ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedImage(img?.original_url)}
            >
              <img
                src={img?.original_url}
                alt={`Thumbnail ${index + 1}`}
                className="img-fluid"
                style={{ height: "75px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        <div className="col-md-10 d-flex justify-content-center align-items-center position-relative">
          <img src={selectedImage || media?.[0]?.original_url} alt="Selected" className="img-fluid border" style={{ width: "100%", height: "530px" }} />
          <div className="hearts-image">
            <img onClick={() => handleWishlist(id)} src={heart} />
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
