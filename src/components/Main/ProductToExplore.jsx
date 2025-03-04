import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import group from '../../media/images/Group.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL, { topRatedProducts } from '../../utils/api';
import LoadingComponents from '../shared/loaders/LoadingComponents';


function ProductToExplore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const page_size = 4;

  const fetchTopRatedProducts = async (page , page_size) => {
    try {
      const response = await topRatedProducts(page , page_size);
      setProducts(response?.data?.data?.product); // Adjust based on API response structure
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedProducts(1 , page_size);
  }, []);

  return (
    <div className="container">
      <div className="product-section">
        <div className="row">
          <div className="product-section-title d-flex justify-content-space-between align-items-center">
            <div className="col-lg-11 d-flex justify-content-left gap-20">
              <img src={group} alt="Group Icon" />
              <h1>Top Products to explore</h1>
            </div>
            <div className="col-lg-1">
              <div className="view-all-buttons">
                <Link to="/product-detail" style={{ textDecoration: 'none' }}>
                  <p>View All</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            {loading ? (
              <LoadingComponents/>
            ) : (
              products?.map((product) => (
                <div className="col-lg-3" key={product.id}>
                  <ProductCard
                    guid={product?.guid}
                    image={product?.media?.[0]?.original_url || 'fallback-image-url'}
                    name={product?.title}
                    price={product?.price}
                    discounted_price={product?.discount_price}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductToExplore;
