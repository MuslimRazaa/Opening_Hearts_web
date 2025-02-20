import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Import Navigation module
import 'swiper/css';
import 'swiper/css/navigation';
import larrow from '../../../media/images/larrow.png';
import rarrow from '../../../media/images/rarrow.png';
import arr from '../../../media/images/Arrow 2.svg';
import exp from '../../../media/images/explore.png';
import sin from '../../../media/images/sin.png';
import TopRatedProvidersCard from '../cards/TopRatedProvidersCard';
import { Link } from 'react-router-dom';
import SingleServiceCustomTabs from './SingleServiceCustomTabs';
import { topRatedServiceProvider } from '../../../utils/api';


function SingleServiceTopButtonsSlider({data}) {
  const [topRatedService, setTopRatedService] = useState([]);
  const [loading, setLoading] = useState([]);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevButtonRef.current;
      swiperRef.current.params.navigation.nextEl = nextButtonRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);


  // const exploreCards = [1, 2, 3, 4, 5, 6, 7, 8];
  
  const fetchTopRatedServiceProvider = async () => {
    setLoading(true)
    try {
      const response = await topRatedServiceProvider();
      setTopRatedService(response?.data?.data?.serviceProvider); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTopRatedServiceProvider();
  }, []);


  return (
    <div className="container">
        <div className="single-slider-top">

      <div className="row d-flex align-items-center">
        <div className="col-lg-6">
            <div className="single-service-heading">
          <h2>Most Popular in {data[0]?.category?.name}</h2>
            </div>
        </div>
        <div className="col-lg-6">
          <div className="single-service-custom-navigation">
            <div ref={prevButtonRef} className="prev-button">
              <img src={larrow} alt="Previous" />
            </div>
            <div ref={nextButtonRef} className="next-button">
              <img src={rarrow} alt="Next" />
            </div>
          </div>
        </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]} // Include Navigation module
        spaceBetween={50}
        slidesPerView={4}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance in ref
      >
      {data?.map((data) => (
        <SwiperSlide><SingleServiceCustomTabs data={data} /></SwiperSlide>
      ))}
      </Swiper>


      <div className="single-service-middle-banner">
        <img src={sin} />
      </div>
      <div className="single-service-cards">

        <div className="row">
          <div className="col-lg-9">
            <h2 className='service-main-heading' style={{margin:"0px"}}>Top Rated Service Providers</h2>
          </div>
          <div className="col-lg-3">
            <div className="service-card-heading-link">
            <Link to='/popularService' > <h2>View All</h2></Link>
            </div>
          </div>
        </div>
        <div className="row">
      {topRatedService?.map((product, index) => (
        <div className="col-lg-3" key={index}>
          <TopRatedProvidersCard 
          id={product?.id}
          user_name={product?.vendor_service?.store_name}
          user_image={product.cover_image}
          user_flag={product?.vendor_service?.country}
          description={product?.description}
          rating={product?.rating}
          rating_count={product?.rating_count}
          />
        </div>
      ))}
    </div>
    </div>

    
      {/* <div className="single-service-cards">

        <div className="row">
          <div className="col-lg-9">
            <h2 className='service-main-heading'>Explore Graphic Designing</h2>
          </div>
          <div className="col-lg-3">
            <div className="service-card-heading-link">
            <Link to='' > <h2>View All</h2></Link>
            </div>
          </div>
        </div>
        <div className="row">
      {exploreCards.map((explore, index) => (
        <div className="col-lg-3" key={index}>
          <div className="single-service-explore-cards">
          <div className="single-service-explore-cards-image">
            <img src={exp} />
            <div class="store-card-arow-ss">
                <img src={arr} className='store-card-arow-ss-image'/>
            </div>
            <div className="single-service-cards-title">
                <p>Logo Designing</p>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
    
    </div> */}
    </div>
  );
}

export default SingleServiceTopButtonsSlider;
