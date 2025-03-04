import React, { useEffect, useState } from 'react'
import group from '../../media/images/Group.svg'
import ServicesCard from './ServicesCard'
import service from '../../media/images/Tem_Images/service.svg'
import buss from '../../media/images/Tem_Images/buss.svg'
import { Link } from 'react-router-dom'
import BASE_URL, { topRatedService } from '../../utils/api'
import axios from 'axios'
import LoadingComponents from '../shared/loaders/LoadingComponents'


function TrendingService() {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedService= async () => {
    try {
      const response = await topRatedService();
      setService(response?.data?.data.service); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTopRatedService();
  }, []);

  return (
    <>
        <div className='container'>
        <div className="product-section">
          <div className="row">
            
            <div className="product-section-title d-flex justify-content-space-between align-item-center" style={{paddingTop: "6rem"}}>
                <div className="col-lg-11 d-flex justify-content-left gap-20">
                  <img src={group} /> <h1>Trending Services</h1>
                </div>
              <div className="col-lg-1">
              <div className="view-all-buttons">
                <Link to="/service-detail"><p>View All</p></Link>
              </div>
              </div>
            </div>



            <div className="row">
            {loading ? (
                <LoadingComponents/>
            ) : (
              service?.slice(0, 4).map((product) => (
                <div className="col-lg-3" key={product.id}>
                  <ServicesCard
                    catId={product?.id}
                    image={product.main_image}
                    name={product.name}
                    cat={product?.category.name}
                    description={product?.category.description}
                    rating={product.price}
                  />
                </div>
              ))
            )}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default TrendingService
