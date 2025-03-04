import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TopCatagoriesCard from "./TopCatagoriesCard";
import left from "../../media/images/left-arrow-svgrepo-com.svg";
import right from "../../media/images/right-arrow-svgrepo-com.svg";
import { topRatedCategories } from "../../utils/api";
import LoadingComponents from "../shared/loaders/LoadingComponents";

function TopCatSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchTopRatedCategories= async () => {
      setLoading(true)
      try {
        const response = await topRatedCategories();
        setCategories(response?.data?.data?.categories); // Adjust based on API response structure

      } catch (error) {
        console.error('Error fetching top-rated products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedCategories();
  }, []);





  // Custom Previous Arrow Component
  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-prev-arrow`} onClick={onClick}>
          <img src={left} style={{width: "30px" , padding: "0px 0px 0px 0px"}}/>
      </div>
    );
  }

  // Custom Next Arrow Component
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={`${className} my-custom-next-arrow`} onClick={onClick}>
          <img src={right} style={{width: "30px" , padding: "0px 0px 0px 0px"}}/>
          </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true, // Enable custom arrows
    prevArrow: <PrevArrow />, // Attach custom PrevArrow component
    nextArrow: <NextArrow /> // Attach custom NextArrow component
  };


  if(loading){
    return(
      <LoadingComponents/>
    )
  }
  else{
    return (
      <div className="slider-wrapper">
        <div className="slider-container">
          <Slider {...settings}>
            {categories.map((product) => (
              <div>
              <TopCatagoriesCard image={product?.media[0]?.original_url } txt={product?.name}/>
            </div>))}
          </Slider>
        </div>
      </div>
    );
  }
 
}

export default TopCatSlider;
