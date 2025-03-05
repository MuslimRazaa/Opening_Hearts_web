import React, { useEffect, useState } from 'react'
import Header from '../../../components/Layout/Header'
import SuplierStoreTop from './SuplierStoreTop'
import SuplierStoreBanner from './SuplierStoreBanner'
import s from '../../../media/images/singleStar.png'

import SuplierAboutCompany from './SuplierAboutCompany'
import SliderOneDetailPage from '../ProductDetail/slider_other-recomendations/SliderOneDetailPage'
import ReviewComponent from '../ProductDetail/ReviewComponent'
import starsS from '../../../media/images/stars.png'
import Footer from '../../../components/Layout/Footer'
import { useLocation } from 'react-router-dom'
import { fetchVendorRatings, fetchVendorStore } from '../../../utils/api'
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents'

function SuplierStoreDetailPAge() {
    const [vendor, setVendor] = useState()
    const [vendorFeedback, setVendorFeedback] = useState()
    const [loading, setLoading] = useState(false)
    const [stars, setStars] = useState(0);


    const ratings = [
        { label: "Supplier service", score: 5.0 },
        { label: "On-time shipment", score: 5.0 },
        { label: "Product quality", score: 5.0 },
    ];

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const guid = queryParams.get('guid');

  

  const FetchVendorStore= async () => {
    setLoading(true)
    try {
      const response = await fetchVendorStore(guid);
      setVendor(response?.data?.data); // Adjust based on API response structure
      setLoading(false)
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false)
    }
  };


  const FetchVendorRatings= async () => {
    setLoading(true)
    try {
      const response = await fetchVendorRatings(guid);
      setVendorFeedback(response?.data?.data?.feedback); // Adjust based on API response structure
      setLoading(false)

    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false)

    }
  };


  useEffect(() => {
    FetchVendorStore();
    FetchVendorRatings()
  }, []);

 
  const handleStars = (stars) => {
    setStars(stars)
}

    if(loading){
        return(
            <>
            <Header/>
            <LoadingComponents />
            <Footer/>
            </>
        )
    }
    else{
        return (
            <>
             <Header/>
             <SuplierStoreTop id={vendor?.id}  guid={guid} vendor={vendor}/>
             <SuplierStoreBanner  vendor={vendor}/>
             <SuplierAboutCompany vendor={vendor} guid={guid}/>
             <div className="container">
             <div className="sliderOne">
                <h2>Products</h2>
                <SliderOneDetailPage guid={guid}  />
            </div>
            <div className="row">
                        <div className="col-lg-6">
                            <div className="rating-header">
                                <h2>Ratings & Reviews</h2>
                                <img src={starsS} />
                            </div>
                            <div className="rating-details-top">
                                <h2>5.0/<span style={{fontSize: "19px" , fontWeight:"400px" , color: "gray"}}>5 Very satisfied</span></h2>
                            </div>
                            <div className="detail-rating-bars">
                                <div className="container mt-4 p-0">
                                    {ratings.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center mb-3"
                                        >
                                            <span className="text-secondary">{item.label}</span>
                                            <div className="flex-grow-1 mx-3" style={{ height: "1px", background: "linear-gradient(90deg, #FF512F, #F09819)" }}></div>
                                            <span className="text-dark">{item.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
        
                        </div>
                    </div>
                    <div className="comments-reviews">
                    <div className="coments-filter-tabs">
                            <div class="f-service-detail-page-top-button">
                                <button onClick={() => handleStars(0)} style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>All</button>
                            </div>
                            <div class="f-service-detail-page-top-button" >
                                <button onClick={() => handleStars(1)} style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>
                                    {Array.from({ length: 1 }).map((_, idx) => (
                                        <img
                                            key={`filled-star-${idx}`}
                                            src={s} // Replace `s` with the actual path or variable holding the star image source
                                            alt="filled star"
                                            style={{ width: "16px", height: "16px", marginRight: "2px" }}
        
                                        />
                                    ))}</button>
                            </div>
                            <div class="f-service-detail-page-top-button" >
                                <button onClick={() => handleStars(2)} style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>
                                    {Array.from({ length: 2 }).map((_, idx) => (
                                        <img
                                            key={`filled-star-${idx}`}
                                            src={s} // Replace `s` with the actual path or variable holding the star image source
                                            alt="filled star"
                                            style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                        />
                                    ))}</button>
                            </div>
                            <div class="f-service-detail-page-top-button" >
                                <button onClick={() => handleStars(3)} style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <img
                                            key={`filled-star-${idx}`}
                                            src={s} // Replace `s` with the actual path or variable holding the star image source
                                            alt="filled star"
                                            style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                        />
                                    ))}</button>
                            </div>
                            <div class="f-service-detail-page-top-button" >
                                <button onClick={() => handleStars(4)} style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <img
                                            key={`filled-star-${idx}`}
                                            src={s} // Replace `s` with the actual path or variable holding the star image source
                                            alt="filled star"
                                            style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                        />
                                    ))}</button>
                            </div>
                            <div class="f-service-detail-page-top-button" onClick={() => handleStars(5)}>
                                <button style={{ fontSize: "12px", padding: "5px 14px", fontWeight: "400" }}>
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <img
                                            key={`filled-star-${idx}`}
                                            src={s} // Replace `s` with the actual path or variable holding the star image source
                                            alt="filled star"
                                            style={{ width: "16px", height: "16px", marginRight: "2px" }}
                                        />
                                    ))}</button>
                            </div>
                        </div>
                            <ReviewComponent stars={stars} ratings={vendorFeedback}/>
                        </div>
                        <div className="send-message-supplier-store">
                            <div className="send-message-title-suplier">
                                <h4>Send Message to Supplier</h4>
                            </div>
                            <div className="send-message-input-suplier">
                                <input type='text' placeholder='Write Message.......'/>
                                <button>Send</button>
                            </div>
                        </div>
             </div>
             <Footer/>
        
            </>
          )
    
    }

  
}

export default SuplierStoreDetailPAge
