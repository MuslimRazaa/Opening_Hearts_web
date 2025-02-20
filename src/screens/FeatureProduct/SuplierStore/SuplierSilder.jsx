import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import left from "../../../media/images/larrow.png";
import right from "../../../media/images/rarrow.png";
import fundimgslide1 from '../../../media/images/slider-fund1.png';
import play from '../../../media/images/play.png';
import { fetchVendorStoreProducts } from "../../../utils/api";

function SuplierSilder({guid}) {

        const [vendor, setVendor] = useState()
    
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
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true, // Enable custom arrows
        prevArrow: <PrevArrow />, // Attach custom PrevArrow component
        nextArrow: <NextArrow /> // Attach custom NextArrow component
    };



    const FetchVendorStoreProducts= async () => {
        try {
          const response = await fetchVendorStoreProducts(guid);
          setVendor(response?.data?.data?.products); // Adjust based on API response structure
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
    
      useEffect(() => {
        FetchVendorStoreProducts();
      }, []);


    return (
        <div className="slider-wrapper">
           {vendor?.length > 1 ?
           ( <div className="slider-container">
                <Slider {...settings}>
                    {vendor?.map((prod) => (
                    <div>
                        <div className="about-company-cards">
                            <img src={prod?.media[0]?.original_url} alt="" style={{ padding: "10px" }} />
                            {/* <img src={play} alt="" className="playy" /> */}
                        </div>
                    </div>
                ))}                   
                </Slider>
            </div>) : ""
        }
        </div>
    );
}

export default SuplierSilder;
