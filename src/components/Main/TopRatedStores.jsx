import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import group from '../../media/images/Group.svg'
import StoreCard from './StoreCard'
import cardImage from '../../media/images/Tem_Images/store.svg'
import soffa from '../../media/images/Tem_Images/soffaa.svg'
import { Link } from 'react-router-dom'
import BASE_URL, { topRatedStores } from '../../utils/api'
import axios from 'axios'


function TopRatedStores() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchedTopStores = async () => {
    try {
      const response = await topRatedStores();
      setStore(response.data?.data?.store); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchedTopStores();
  }, []);



  return (
    <>
      <div className='container'>
        <div className="product-section">
          <div className="row">
            <div className="product-section-title d-flex justify-content-space-between align-item-center">
              <div className="col-lg-11 d-flex justify-content-left gap-20">
                <img src={group} /> <h1>Top Rated Stores</h1>
              </div>
              <div className="col-lg-1">
                <div className="view-all-buttons">
                  <Link to='/store-detail'><p>View All</p></Link>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-lg-4">
                  <StoreCard image={soffa} cat={"faishon1"}/>
              </div>
              <div className="col-lg-4">
                  <StoreCard image={cardImage} cat={"faishon2"}/>
              </div>
              <div className="col-lg-4">
                  <StoreCard image={soffa} cat={"faishon3"}/>
              </div> */}

              {loading ? (
                <p>Loading...</p>
              ) : (
                store?.slice(0, 4).map((product) => (
                  <div className="col-lg-3" key={product.id}>
                    <StoreCard
                      guid={product?.guid}                        
                      cat={product?.category[0]?.name}
                      image={product.cover_image || 'fallback-image-url'}
                      name={product.shop_name}
                      rating={product.rating}
                      vImage={product?.main_image}
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

export default TopRatedStores
