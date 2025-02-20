import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import left from "../../../../media/images/larrow.png";
import right from "../../../../media/images/rarrow.png";
import image2 from "../../../../media/images/Rectangle 4404.png";
import FeatureProductCard from "../../../../components/Main/FeatureProductCard";
import { relatedproducts } from "../../../../utils/api";



function SliderOneDetailPage({ guid }) {
  const [productDetails, setProductDetails] = useState();

  const fetchProductDetails = async () => {
    try {
      const response = await relatedproducts(guid);
      setProductDetails(response?.data?.data?.products); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    fetchProductDetails();
  }, [guid]);


  // Custom Previous Arrow Component
  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-prev-arrow`} onClick={onClick}>
        <img src={left} style={{ width: "30px", padding: "0px 0px 0px 0px" }} />
      </div>
    );
  }

  // Custom Next Arrow Component
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-next-arrow`} onClick={onClick}>
        <img src={right} style={{ width: "30px", padding: "0px 0px 0px 0px" }} />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true, // Enable custom arrows
    prevArrow: <PrevArrow />, // Attach custom PrevArrow component
    nextArrow: <NextArrow /> // Attach custom NextArrow component
  };

  return (
    <div className="slider-wrapper">
      {productDetails?.length > 1 ? <div className="slider-container">
        <Slider {...settings}>
          {productDetails?.map((qty) => (
            <div key={qty.id}>
              <FeatureProductCard image={qty?.media[0]?.original_url} name={qty?.title} Category={qty?.category?.name} price={qty?.price} discounted_price={qty?.discount_price} />
            </div>
          ))}

        </Slider>
      </div> : "Not Available"}
    </div>
  );
}

export default SliderOneDetailPage;
