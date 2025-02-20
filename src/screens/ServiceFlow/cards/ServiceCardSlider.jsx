import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import left from "../../../media/images/larrow.png";
import right from "../../../media/images/rarrow.png";
import PopularService from "./PopularService";
import { Link } from "react-router-dom";
import { popularService, serviceAllCategories } from "../../../utils/api";

function ServiceCardSlider() {
  const [popSer, setPopSer] = useState([]);
  const [popSer2, setPopSer2] = useState([]);



  // Custom Previous Arrow Component
  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-prev-arrow-service`} onClick={onClick}>
        <img src={left} style={{ width: "15px", margin:"0px 28px",  padding: "0px 0px 0px 0px" }} />
      </div>
    );
  }

  // Custom Next Arrow Component
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-next-arrow-service`} onClick={onClick}>
        <img src={right} style={{ width: "15px", padding: "0px 0px 0px 0px" }} />
      </div>
    );
  }



  const fetchServiceAllCategories = async () => {
    try {
      const response = await serviceAllCategories();
      setPopSer2(response.data?.data?.categories); // Adjust based on API response structure

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    fetchServiceAllCategories();
  }, []);

  // useEffect(() => {
  //   fetchPopularService();
  // }, []);


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
      <div className="slider-container-service">
        <Slider {...settings}>
          {popSer2?.map((popularServices) => (
         
              <PopularService id={popularServices?.id} title={popularServices.name} image={popularServices.main_image} description={popularServices.description} />

          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ServiceCardSlider;
