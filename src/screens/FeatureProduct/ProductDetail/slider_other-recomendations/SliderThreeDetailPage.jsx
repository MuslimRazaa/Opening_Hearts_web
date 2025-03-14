import React from "react";
import Slider from "react-slick";
import left from "../../../../media/images/larrow.png";
import right from "../../../../media/images/rarrow.png";
import image2 from "../../../../media/images/Tem_Images/donationCard.svg";
import DonationCard from "../../../../components/Main/DonationCard";

function SliderThreeDetailPage({data}) {
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
      <div className="slider-container">
        <Slider {...settings}>
          {data?.campaign?.map((product) => (<div>
            <DonationCard
              id={product?.id}
              image={product?.cover_image}
              name={product?.name}
              req_amt={product?.fund_required}
              description={product?.desctiption}
              dnt_amt={product?.receive_amount}
            />          
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderThreeDetailPage;
