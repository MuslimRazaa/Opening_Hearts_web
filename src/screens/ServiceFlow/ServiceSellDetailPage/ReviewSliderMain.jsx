import React from "react";
import Slider from "react-slick";
import left from "../../../media/images/larrow.png";
import right from "../../../media/images/rarrow.png";
import ReviewSlider from "./ReviewSlider";

function ReviewSliderMain() {
  // Custom Previous Arrow Component
  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-prev-arrow`} onClick={onClick}>
          <img src={left} style={{width: "20px" , padding: "0px 0px 0px 0px"}}/>
      </div>
    );
  }

  // Custom Next Arrow Component
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-next-arrow`} onClick={onClick}>
          <img src={right} style={{width: "20px" , padding: "0px 0px 0px 0px"}}/>
          </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true, // Enable custom arrows
    prevArrow: <PrevArrow />, // Attach custom PrevArrow component
    nextArrow: <NextArrow /> // Attach custom NextArrow component
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider/>
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
          <div>
            <ReviewSlider />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default ReviewSliderMain;
